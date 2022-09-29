package run.ward.mmz.mapper.post;

import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.Review;
import run.ward.mmz.dto.request.post.ReviewPostDto;
import run.ward.mmz.dto.respones.ReviewResponseDto;

import java.util.List;

public interface ReviewMapper {

    Review toEntity(ReviewPostDto reviewPostDto, Account owner, Recipe recipe);
    ReviewResponseDto toResponseDto(Review review);
    List<ReviewResponseDto> toResponseDto(List<Review> reviewList);
}
