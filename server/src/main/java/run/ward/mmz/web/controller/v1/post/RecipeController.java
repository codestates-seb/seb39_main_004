package run.ward.mmz.web.controller.v1.post;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.account.Role;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.file.Image.ImageType;
import run.ward.mmz.domain.post.*;
import run.ward.mmz.dto.request.post.patch.RecipePatchDto;
import run.ward.mmz.dto.request.post.RecipePostDto;
import run.ward.mmz.dto.common.ResponseDto;
import run.ward.mmz.dto.respones.RecipeInfoDto;
import run.ward.mmz.dto.respones.RecipeResponseDto;
import run.ward.mmz.handler.file.FileHandler;
import run.ward.mmz.mapper.file.FilesMapper;
import run.ward.mmz.mapper.post.DirectionMapper;
import run.ward.mmz.mapper.post.IngredientMapper;
import run.ward.mmz.mapper.post.RecipeMapper;
import run.ward.mmz.mapper.post.TagMapper;
import run.ward.mmz.service.post.RecipeService;
import run.ward.mmz.service.post.RecipeTagService;
import run.ward.mmz.service.post.TagService;
import run.ward.mmz.service.post.impl.TestAccountService;
import run.ward.mmz.web.auth.LoginUser;

import javax.validation.constraints.Positive;
import java.util.List;


@Log4j2
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class RecipeController {

    private static final int PAGE_SIZE = 12;

    private final DirectionMapper directionMapper;
    private final IngredientMapper ingredientMapper;
    private final TagMapper tagMapper;
    private final RecipeMapper recipeMapper;


    private final FileHandler fileHandler;
    private final FilesMapper filesMapper;
    private final RecipeService recipeService;
    private final TagService tagService;
    private final RecipeTagService recipeTagService;
    private final TestAccountService testAccountService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/recipe/add")
    public ResponseEntity<?> postRecipePage(
            @LoginUser Account user,
            @RequestPart(value = "imgThumbNail", required = false) MultipartFile imgThumbNail,
            @RequestPart(value = "imgDirection", required = false) List<MultipartFile> imgDirectionList,
            @RequestPart(value = "recipe") RecipePostDto recipePostDto) {

        //Test account
        Account testOwner = testAccountService.save(user);

        //Controller Code

        Files imgThumbNailFile = filesMapper.fileDtoToImage(fileHandler.parseFileInfo(imgThumbNail, ImageType.EXTENSIONS));
        List<Files> imgDirections = filesMapper.fileDtoListToImageList(fileHandler.parseFileInfo(imgDirectionList, ImageType.EXTENSIONS));

        List<Direction> directions = directionMapper.toEntity(recipePostDto.getDirections(), imgDirections);
        List<Ingredient> ingredients = ingredientMapper.toEntity(recipePostDto.getIngredients());
        List<Tag> tags = tagMapper.toEntity(recipePostDto.getTags());
        
        Recipe recipe = recipeMapper.toEntity(testOwner, recipePostDto, imgThumbNailFile, ingredients, directions);
        recipe = recipeService.save(recipe);
        tagService.saveAll(tags);
        recipeTagService.save(tags, recipe);

        RecipeInfoDto infoDto = recipeMapper.toInfoDto(recipe);
        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(infoDto)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/recipe/{recipeId}")
    public ResponseEntity<?> readRecipePage(
            @PathVariable Long recipeId) {

        recipeService.verifyExistsId(recipeId); //레시피가 있는 지 예외 처리

        Recipe recipe = recipeService.findById(recipeId);
        recipeService.addViews(recipeId);

        RecipeResponseDto responseDto = recipeMapper.toResponseDto(recipe);
        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(responseDto)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/recipe/{recipeId}/edit")
    public ResponseEntity<?> readRecipeUpdatePage(
            @LoginUser Account user,
            @PathVariable Long recipeId){

        recipeService.verifyAccessOwner(recipeId, user.getId());

        Recipe recipe = recipeService.findById(recipeId);

        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(recipeMapper.toPatchDto(recipe))
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PatchMapping("/recipe/{recipeId}/edit")
    public ResponseEntity<?> updateRecipePage(
            @LoginUser Account user,
            @PathVariable Long recipeId,
            @RequestPart(value = "imgThumbNail", required = false) MultipartFile imgThumbNail,
            @RequestPart(value = "imgDirection", required = false) List<MultipartFile> imgDirectionList,
            @RequestPart(value = "recipe") RecipePatchDto recipePatchDto ){

        recipeService.verifyAccessOwner(recipeId, user.getId());

        filesMapper.fileDtoToImage(fileHandler.parseFileInfo(imgThumbNail, ImageType.EXTENSIONS));
        filesMapper.fileDtoListToImageList(fileHandler.parseFileInfo(imgDirectionList, ImageType.EXTENSIONS));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("/recipe/{recipeId}/delete")
    public ResponseEntity<?> deleteRecipePage(
            @LoginUser Account user,
            @PathVariable Long recipeId) {

        recipeService.verifyAccessOwner(recipeId, user.getId());
        recipeService.deleteById(recipeId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/recipe/search/{pageNo}")
    public ResponseEntity<?> readSearchPage(
            @Positive @PathVariable(required = false, value = "pageNo") int pageNo,
            @RequestParam(required = false, defaultValue = "id", value = "orderBy") String orderBy,
            @RequestParam("search") String search,
            @RequestParam(required = false, defaultValue = "dec", value = "sort") String sort) {

        Page<Recipe> recipePage = recipeService.findAllBySearch(pageNo, PAGE_SIZE, search, orderBy, sort);

        return getResponseEntity(recipePage);
    }

    @GetMapping("/recipe/all/{pageNo}")
    public ResponseEntity<?> readAllPage(
            @Positive @PathVariable(required = false, value = "pageNo") int pageNo,
            @RequestParam(required = false, defaultValue = "id", value = "orderBy") String orderBy,
            @RequestParam(required = false, defaultValue = "dec", value = "sort") String sort) {

        Page<Recipe> recipePage = recipeService.findAll(pageNo, PAGE_SIZE, orderBy, sort);

        return getResponseEntity(recipePage);
    }


    @GetMapping("/recipe/category/{pageNo}")
    public ResponseEntity<?> readCategoryPage(
            @Positive @PathVariable(required = false, value = "pageNo") int pageNo,
            @RequestParam(required = false, defaultValue = "id", value = "orderBy") String orderBy,
            @RequestParam("category") String category,
            @RequestParam(required = false, defaultValue = "dec", value = "sort") String sort) {

        Page<Recipe> recipePage = recipeService.findAllByCategory(pageNo, PAGE_SIZE, category, orderBy, sort);

        return getResponseEntity(recipePage);
    }


    private ResponseEntity<?> getResponseEntity(Page<Recipe> recipePage) {

        List<RecipeInfoDto> responseDtoList = recipeMapper.toInfoDto(recipePage.getContent());
        ResponseDto.Multi<?> response = new ResponseDto.Multi<>(responseDtoList, recipePage);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }




}
