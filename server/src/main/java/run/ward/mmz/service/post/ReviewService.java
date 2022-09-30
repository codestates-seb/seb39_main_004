package run.ward.mmz.service.post;

import org.springframework.data.domain.Page;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.Review;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.service.common.CrudService;

import java.util.List;
import java.util.Objects;

public interface ReviewService extends CrudService<Review> {

    List<Review> findAllByRecipeId(Long recipeId);

    Page<Review> findAllByRecipeId(int page, int size, Long recipeId, String orderBy, String sort);
    Page<Review> findAllByAccountId(int page, int size, Long accountId, String orderBy, String sort);
    void verifyAccessOwner(Long reviewId, Long accountId);
}
