package run.ward.mmz.web.controller.v1;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.account.Role;
import run.ward.mmz.domain.post.Review;
import run.ward.mmz.dto.common.ResponseDto;
import run.ward.mmz.dto.request.post.ReviewPostDto;
import run.ward.mmz.dto.respones.ReviewResponseDto;
import run.ward.mmz.mapper.post.ReviewMapper;
import run.ward.mmz.service.RecipeService;
import run.ward.mmz.service.ReviewService;
import run.ward.mmz.service.impl.TestAccountService;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReviewController {

    private final RecipeService recipeService;
    private final ReviewService reviewService;

    private final TestAccountService testAccountService;
    private final ReviewMapper reviewMapper;


    @PostMapping("/recipe/{recipeId}/review/add")
    public ResponseEntity<?> postReviewPage(
            Account user,
            @PathVariable Long recipeId,
            @RequestBody ReviewPostDto reviewDto ) {

        //Test account

        user.setId(2L);
        user.setName("와드");
        user.setBio("와드입니다.");
        user.setEmail("ward@ward.run");
        user.setRole(Role.USER);

        user = testAccountService.save(user);

        recipeService.verifyExistsId(recipeId); //recipeId가 없을 경우 예외처리

        Review review = reviewMapper.toEntity(reviewDto, user, recipeService.findById(recipeId));
        reviewService.save(review);
        recipeService.updateStars(recipeId);

        List<ReviewResponseDto> responseDtoList = reviewMapper.toResponseDto(reviewService.findAllByRecipeId(recipeId));

        ResponseDto.Single<?> responseDto = ResponseDto.Single.builder()
                .data(responseDtoList)
                .build();

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @DeleteMapping("/recipe/{recipeId}/review/{reviewId}/delete")
    public ResponseEntity<?> deleteReviewPage(
            Account user,
            @PathVariable Long recipeId,
            @PathVariable Long reviewId) {

        //Test account

        user.setId(2L);
        user.setName("와드");
        user.setBio("와드입니다.");
        user.setEmail("ward@ward.run");
        user.setRole(Role.USER);

        user = testAccountService.save(user);

        recipeService.verifyExistsId(recipeId); //recipe 가 없을 경우 예외처리
        reviewService.verifyAccessOwner(reviewId, user.getId()); //review 가 없을 경우 예외처리

        reviewService.deleteById(reviewId);

        List<ReviewResponseDto> responseDtoList = reviewMapper.toResponseDto(reviewService.findAllByRecipeId(recipeId));

        ResponseDto.Single<?> responseDto = ResponseDto.Single.builder()
                .data(responseDtoList)
                .build();

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

}
