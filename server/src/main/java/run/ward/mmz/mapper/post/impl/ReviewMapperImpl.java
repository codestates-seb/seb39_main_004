package run.ward.mmz.mapper.post.impl;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.Review;
import run.ward.mmz.dto.request.post.ReviewPostDto;
import run.ward.mmz.dto.respones.ReviewResponseDto;
import run.ward.mmz.mapper.post.ReviewMapper;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReviewMapperImpl implements ReviewMapper {

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
                .id(review.getId())
                .stars(review.getStars())
                .body(review.getBody())
                .createDate(review.getCreateDate())
                .modifyDate(review.getModDate())
                .build();
    }

    @Override
    public List<ReviewResponseDto> toResponseDto(List<Review> reviewList) {

        if(reviewList.isEmpty()){
            return new ArrayList<>();
        }

        List<ReviewResponseDto> reviewResponseDtoList = new ArrayList<>();

        for(Review review : reviewList){
            reviewResponseDtoList.add(toResponseDto(review));
        }

        return reviewResponseDtoList;
    }
}
