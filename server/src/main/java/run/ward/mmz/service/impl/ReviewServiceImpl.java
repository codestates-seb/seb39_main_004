package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Review;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.ReviewRepository;
import run.ward.mmz.service.RecipeService;
import run.ward.mmz.service.ReviewService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    @Override
    public List<Review> saveAll(List<Review> list) {
        return null;
    }

    @Override
    @Transactional
    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public Review findById(Long id) {
        return findVerifiedEntity(id);
    }

    @Override
    public void deleteById(Long id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public Review update(Long id, Review review) {
        return null;
    }

    @Override
    public void verifyExistsId(Long id) {
        if (!reviewRepository.existsById(id))
            throw new CustomException(ExceptionCode.REVIEW_NOT_FOUND);
    }

    @Override
    public Review findVerifiedEntity(Long id) {
        return reviewRepository.findById(id).orElseThrow(
                () -> new CustomException(ExceptionCode.REVIEW_NOT_FOUND)
        );
    }

    @Override
    public List<Review> findAllByRecipeId(Long recipeId) {
        return reviewRepository.findAllByRecipeId(recipeId);
    }
}
