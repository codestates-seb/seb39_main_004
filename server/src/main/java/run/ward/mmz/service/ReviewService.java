package run.ward.mmz.service;

import org.springframework.data.domain.Page;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.Review;
import run.ward.mmz.service.common.CrudService;

import java.util.List;

public interface ReviewService extends CrudService<Review> {

    List<Review> findAllByRecipeId(Long recipeId);
    Page<Recipe> findAllByAccountId(int page, int size, Long accountId, String orderBy);
}
