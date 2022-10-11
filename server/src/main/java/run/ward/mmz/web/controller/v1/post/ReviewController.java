package run.ward.mmz.web.controller.v1.post;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Review;
import run.ward.mmz.dto.common.ResponseDto;
import run.ward.mmz.dto.request.post.ReviewPostDto;
import run.ward.mmz.dto.respones.ReviewResponseDto;
import run.ward.mmz.mapper.post.ReviewMapper;
import run.ward.mmz.service.post.RecipeService;
import run.ward.mmz.service.post.ReviewService;
import run.ward.mmz.service.post.impl.TestAccountService;
import run.ward.mmz.handler.auth.LoginUser;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReviewController {

    private static final int REIVEW_SIZE = 12;
    private final RecipeService recipeService;
    private final ReviewService reviewService;

    private final TestAccountService testAccountService;
    private final ReviewMapper reviewMapper;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/recipe/{recipeId}/review/add")
    public ResponseEntity<?> postReviewPage(
            @LoginUser Account user,
            @PathVariable Long recipeId,
            @RequestBody ReviewPostDto reviewDto ) {

        user = testAccountService.save(user);

        recipeService.verifyExistsId(recipeId); //recipeId가 없을 경우 예외처리

        Review review = reviewMapper.toEntity(reviewDto, user, recipeService.findById(recipeId));
        reviewService.save(review);
        recipeService.updateStars(recipeId);

        Page<Review> reviewPage = reviewService.findAllByRecipeId(1, REIVEW_SIZE, recipeId, "id", "dec");

        return getResponseEntity(reviewPage);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("/recipe/{recipeId}/review/{reviewId}/delete")
    public ResponseEntity<?> deleteReviewPage(
            @LoginUser Account user,
            @PathVariable Long recipeId,
            @PathVariable Long reviewId) {

        user = testAccountService.save(user);

        recipeService.verifyExistsId(recipeId); //recipe 가 없을 경우 예외처리
        reviewService.verifyAccessOwner(reviewId, user.getId()); //review 작성자가 맞는 지 확인 및 review 번호가 존재하는지

        reviewService.deleteById(reviewId);

        Page<Review> reviewPage = reviewService.findAllByRecipeId(1, REIVEW_SIZE, recipeId, "id", "dec");
        recipeService.updateStars(recipeId);
        return getResponseEntity(reviewPage);
    }


    @GetMapping("/recipe/{recipeId}/review")
    public ResponseEntity<?> getReviewPage(
            @PathVariable Long recipeId,
            @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @RequestParam(required = false, defaultValue = "id", value = "orderBy") String orderBy,
            @RequestParam(required = false, defaultValue = "dec", value = "sort") String sort) {

        Page<Review> reviewPage = reviewService.findAllByRecipeId(page, REIVEW_SIZE, recipeId, orderBy, sort);

        return getResponseEntity(reviewPage);
    }

    private ResponseEntity<?> getResponseEntity(Page<Review> reviewPage) {

        List<ReviewResponseDto> responseDtoList = reviewMapper.toResponseDto(reviewPage.getContent());
        ResponseDto.Multi<?> response = new ResponseDto.Multi<>(responseDtoList, reviewPage);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
