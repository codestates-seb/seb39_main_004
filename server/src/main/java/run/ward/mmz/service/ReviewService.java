package run.ward.mmz.service;

import run.ward.mmz.domain.post.Review;
import run.ward.mmz.service.common.CrudService;

import java.util.List;

public interface ReviewService extends CrudService<Review> {

    List<Review> findAllByRecipeId(Long recipeId);
}
