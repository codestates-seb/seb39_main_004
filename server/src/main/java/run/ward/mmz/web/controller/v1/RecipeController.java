package run.ward.mmz.web.controller.v1;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.domain.post.Ingredient;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.dto.IngredientPostDto;
import run.ward.mmz.dto.RecipePostDto;
import run.ward.mmz.dto.common.ResponseDto;
import run.ward.mmz.handler.file.FileHandler;
import run.ward.mmz.mapper.post.DirectionMapper;
import run.ward.mmz.service.ImageService;

import java.util.List;


@Log4j2
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class RecipeController {

    private final DirectionMapper directionMapper;
    private final ImageService imageService;

    @PostMapping("/recipe/new")
    public ResponseEntity<ResponseDto.Single<?>> postRecipe( Account owner,
            @RequestPart(value = "imgThumbNail", required = false) MultipartFile imgThumbNail,
            @RequestPart(value = "imgDirection", required = false) List<MultipartFile> imgDirections,
            @RequestPart(value = "recipe", required = false) RecipePostDto recipePostDto){

        List<Direction> directions = directionMapper.toEntity(recipePostDto.getDirections(),imageService.saveAll(imgDirections));
        List<Ingredient> ingredients =


        return null;
    }

}
