package run.ward.mmz.web.controller.v1.account;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.file.Image.ImageType;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.Review;
import run.ward.mmz.dto.auth.SessionUser;
import run.ward.mmz.dto.common.ResponseDto;
import run.ward.mmz.dto.respones.AccountInfoDto;
import run.ward.mmz.dto.respones.RecipeInfoDto;
import run.ward.mmz.dto.respones.ReviewResponseDto;
import run.ward.mmz.dto.respones.UserPageDto;
import run.ward.mmz.handler.auth.LoginUser;
import run.ward.mmz.handler.file.FileHandler;
import run.ward.mmz.mapper.account.AccountMapper;
import run.ward.mmz.mapper.file.FilesMapper;
import run.ward.mmz.mapper.post.RecipeMapper;
import run.ward.mmz.mapper.post.ReviewMapper;
import run.ward.mmz.service.account.AccountService;
import run.ward.mmz.service.account.SubscribeService;
import run.ward.mmz.service.post.BookmarkService;
import run.ward.mmz.service.post.RecipeService;
import run.ward.mmz.service.post.ReviewService;

import javax.validation.constraints.Positive;
import java.util.List;


@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AccountController {

    private static final int PAGE_SIZE = 12;
    private final AccountService accountService;
    private final AccountMapper accountMapper;
    private final RecipeService recipeService;
    private final RecipeMapper recipeMapper;
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;
    private final BookmarkService bookmarkService;
    private final FilesMapper filesMapper;
    private final FileHandler fileHandler;
    private final SubscribeService subscribeService;



    @Operation(summary = "회원 정보 수정 페이지", description = "유저를 수정하기 위해 현재 회원 데이터를 조회합니다." , tags = "회원 정보 관련")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "정상적인 응답입니다.", content = @Content(schema = @Schema(implementation = AccountInfoDto.class))),
            @ApiResponse(responseCode = "401", description = "로그인 상태가 아닙니다."),
            @ApiResponse(responseCode = "500", description = "서버 오류입니다.")
    })
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping(value = "/auth/signup/user-info", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUserInfoPage(
           @LoginUser Account user) {

        AccountInfoDto accountInfoDto = accountMapper.toInfoDto(user);
        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(accountInfoDto)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "회원 정보 수정", description = "현재 로그인 한 유저의 정보를 수정합니다.", tags = "회원 정보 관련")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "정상적인 응답입니다."),
            @ApiResponse(responseCode = "401",  description = "로그인 상태가 아닙니다."),
            @ApiResponse(responseCode = "500", description = "서버 오류입니다.")
    })
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/auth/signup/user-info/update")
    public ResponseEntity<?> updateUserInfo(
            @LoginUser Account user,
            @RequestBody AccountInfoDto userInfoDto) {

        Account editUser = accountService.update(user, userInfoDto);

        SessionUser sessionUser = SessionUser.builder()
                .user(editUser)
                .build();

        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(sessionUser)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/user/upload/profile")
    public ResponseEntity<?> uploadImgProfile(
            @LoginUser Account user,
            @RequestPart(value = "imgProfile", required = false) MultipartFile imgProfile) {

        Files updateImgProfile = filesMapper.fileDtoToImage(fileHandler.parseFileInfo(imgProfile, ImageType.EXTENSIONS));
        Account updateUser = accountService.updateImgProfile(user.getId(), updateImgProfile);
        AccountInfoDto accountInfoDto = accountMapper.toInfoDto(updateUser);

        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(accountInfoDto)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<?> userPage(
            @Positive @PathVariable Long userId) {

        accountService.verifyExistsId(userId);

        AccountInfoDto accountInfoDto = accountMapper.toInfoDto(accountService.findById(userId));
        Page<Recipe> recipePage = recipeService.findAllByOwnerId(1, PAGE_SIZE, userId, "id", "dec");
        List<RecipeInfoDto> responseDtoList = recipeMapper.toInfoDto(recipePage.getContent());


        UserPageDto<?> response = UserPageDto.builder()
                .user(accountInfoDto)
                .page(recipePage)
                .followerCount(subscribeService.countFollowUserByAccount(userId))
                .followingCount(subscribeService.countFollowingUserByAccount(userId))
                .data(responseDtoList)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);

    }


    @GetMapping("/user/{userId}/bookmark/{pageNo}")
    public ResponseEntity<?> readUserBookmarkPage(
            @Positive @PathVariable(required = false, value = "pageNo") int pageNo,
            @Positive @PathVariable(value = "userId") Long userId,
            @RequestParam(required = false, defaultValue = "id", value = "orderBy") String orderBy,
            @RequestParam(required = false, defaultValue = "dec", value = "sort") String sort) {

        accountService.verifyExistsId(userId);

        Page<Recipe> recipePage = bookmarkService.findAllBookmarkedRecipeByUserId(pageNo, PAGE_SIZE, userId, orderBy, sort);
        List<RecipeInfoDto> responseDtoList = recipeMapper.toInfoDto(recipePage.getContent());

        ResponseDto.Multi<?> response = ResponseDto.Multi.builder()
                .data(responseDtoList)
                .page(recipePage)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/recipe/{pageNo}")
    public ResponseEntity<?> readUserRecipePage(
            @Positive @PathVariable(required = false, value = "pageNo") int pageNo,
            @Positive @PathVariable(value = "userId") Long userId,
            @RequestParam(required = false, defaultValue = "id", value = "orderBy") String orderBy,
            @RequestParam(required = false, defaultValue = "dec", value = "sort") String sort) {

        accountService.verifyExistsId(userId);

        Page<Recipe> recipePage = recipeService.findAllByOwnerId(pageNo, PAGE_SIZE, userId, orderBy, sort);
        List<RecipeInfoDto> responseDtoList = recipeMapper.toInfoDto(recipePage.getContent());

        ResponseDto.Multi<?> response = ResponseDto.Multi.builder()
                .data(responseDtoList)
                .page(recipePage)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/user/{userId}/review/{pageNo}")
    public ResponseEntity<?> readUserReviewPage(
            @Positive @PathVariable(required = false, value = "pageNo") int pageNo,
            @Positive @PathVariable(value = "userId") Long userId,
            @RequestParam(required = false, defaultValue = "id", value = "orderBy") String orderBy,
            @RequestParam(required = false, defaultValue = "dec", value = "sort") String sort) {

        accountService.verifyExistsId(userId);

        Page<Review> reviewPage = reviewService.findAllByAccountId(pageNo, PAGE_SIZE, userId, orderBy, sort);
        List<ReviewResponseDto> responseDtoList = reviewMapper.toResponseDto(reviewPage.getContent());

        ResponseDto.Multi<?> response = ResponseDto.Multi.builder()
                .data(responseDtoList)
                .page(reviewPage)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
