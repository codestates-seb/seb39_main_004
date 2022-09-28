package run.ward.mmz.service;

import org.springframework.data.domain.Page;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.service.common.CrudService;

import java.util.List;

public interface RecipeService extends CrudService<Recipe> {

    List<Recipe> findAll();
    void updateStars(Long id);
    void addViews(Long id);

    Page<Recipe> findAllByCategory(int page, int size, String category, String orderBy);
    Page<Recipe> findAllBySearch(int page, int size, String search, String orderBy);


}
