package run.ward.mmz.mapper.post.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.Review;
import run.ward.mmz.dto.request.post.ReviewPostDto;
import run.ward.mmz.dto.respones.ReviewResponseDto;
import run.ward.mmz.mapper.account.AccountMapper;
import run.ward.mmz.mapper.post.ReviewMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ReviewMapperImpl implements ReviewMapper {

    private final AccountMapper accountMapper;

    @Override
    public Review toEntity(ReviewPostDto reviewPostDto, Account owner, Recipe recipe) {

        if (reviewPostDto == null) {
            return null;
        }

        return Review.createReview(
                reviewPostDto.getBody(),
                reviewPostDto.getStars(),
                owner,
                recipe
        );
    }

    @Override
    public ReviewResponseDto toResponseDto(Review review) {

        if(review == null){
            return null;
        }

        return ReviewResponseDto.builder()
                .recipeImgThumbNail(review.getRecipe().getImgThumbNail().getFileName())
                .recipeTitle(review.getRecipe().getTitle())
                .owner(accountMapper.toInfoDto(review.getOwner()))
                .id(review.getId())
                .stars(review.getStars())
                .body(review.getBody())
                .recipeId(review.getRecipe().getId())
                .createDate(review.getCreateDate().toString())
                .modifyDate(review.getModDate().toString())
                .build();
    }

    @Override
    public List<ReviewResponseDto> toResponseDto(List<Review> reviewList) {

        return reviewList.stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }
}
