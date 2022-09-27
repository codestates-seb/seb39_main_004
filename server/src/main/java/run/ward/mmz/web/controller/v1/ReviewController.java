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
import run.ward.mmz.dto.request.ReviewPostDto;
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
    public ResponseEntity<?> postReview(
            Account owner,
            @PathVariable Long recipeId,
            @RequestBody ReviewPostDto reviewDto ) {

        //Test account

        owner.setId(2L);
        owner.setName("와드");
        owner.setBio("와드입니다.");
        owner.setEmail("ward@ward.run");
        owner.setRole(Role.USER);
        Account testOwner = testAccountService.save(owner);

        recipeService.verifyExistsId(recipeId); //recipeId가 없을 경우 예외처리

        Review review = reviewMapper.toEntity(reviewDto, testOwner, recipeService.findById(recipeId));
        reviewService.save(review);
        recipeService.updateStars(recipeId);

        List<ReviewResponseDto> responseDtoList = reviewMapper.toResponseDto(reviewService.findAllByRecipeId(recipeId));

        ResponseDto.Single<?> responseDto = ResponseDto.Single.builder()
                .data(responseDtoList)
                .build();


        return new ResponseEntity(responseDto, HttpStatus.OK);
    }

}
