package run.ward.mmz.service.post.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Review;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.post.ReviewRepository;
import run.ward.mmz.service.post.ReviewService;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    @Override
    @Transactional
    public List<Review> saveAll(List<Review> list) {
        return null;
    }

    @Override
    @Transactional
    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    @Transactional(readOnly = true)
    public Review findById(Long id) {
        return findVerifiedEntity(id);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        reviewRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Review update(Long id, Review review) {
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public void verifyExistsId(Long id) {
        if (!reviewRepository.existsById(id))
            throw new CustomException(ExceptionCode.REVIEW_NOT_FOUND);
    }

    @Override
    @Transactional(readOnly = true)
    public Review findVerifiedEntity(Long id) {
        return reviewRepository.findById(id).orElseThrow(
                () -> new CustomException(ExceptionCode.REVIEW_NOT_FOUND)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<Review> findAllByRecipeId(Long recipeId) {
        return reviewRepository.findAllByRecipeId(recipeId);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Review> findAllByRecipeId(int page, int size, Long recipeId, String orderBy, String sort) {

        Sort bySort = Sort.by(orderBy).descending();

        if (!sort.equals("dec"))
            bySort = bySort.ascending();

        return reviewRepository.findAllByRecipeId(
                recipeId,
                PageRequest.of(page - 1 , size, bySort)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Review> findAllByAccountId(int page, int size, Long accountId, String orderBy, String sort) {

        Sort bySort = Sort.by(orderBy).descending();

        if (!sort.equals("dec"))
            bySort = bySort.ascending();

        return reviewRepository.findAllByOwnerId(
                accountId,
                PageRequest.of(page - 1 , size, bySort)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public void verifyAccessOwner(Long reviewId, Long accountId) {
        Long ownerId = findVerifiedEntity(reviewId).getOwner().getId();
        if (!Objects.equals(ownerId, accountId))
            throw new CustomException(ExceptionCode.USER_ACCESS_DENIED);
    }
}
