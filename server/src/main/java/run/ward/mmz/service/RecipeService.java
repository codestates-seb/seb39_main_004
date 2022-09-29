package run.ward.mmz.service;

import org.springframework.data.domain.Page;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.service.common.CrudService;

import java.util.List;

public interface RecipeService extends CrudService<Recipe> {


    void verifyAccessOwner(Long recipeId, Long accountId);
    List<Recipe> findAll();
    void updateStars(Long id);
    void addViews(Long id);
    Page<Recipe> findAllByCategory(int page, int size, String category, String orderBy, String sort);
    Page<Recipe> findAllBySearch(int page, int size, String search, String orderBy, String sort);
    Page<Recipe> findAllByAccountId(int page, int size, Long accountId, String orderBy, String sort);

}
