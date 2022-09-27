package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Review;
import run.ward.mmz.repository.ReviewRepository;
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
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public Review update(Long id, Review review) {
        return null;
    }

    @Override
    public void verifyExistsId(Long id) {

    }

    @Override
    public Review findVerifiedEntity(Long id) {
        return null;
    }

    @Override
    public List<Review> findAllByRecipeId(Long recipeId) {
        return reviewRepository.findAllByRecipeId(recipeId);
    }
}
