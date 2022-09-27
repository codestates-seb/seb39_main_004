package run.ward.mmz.service.common;

import java.util.List;

public interface RecipeElementService<T> extends CrudService<T> {

    T findByRecipeId(Long recipeId);
    List<T> findAllByRecipeId(Long recipeId);
    void verifyExistsRecipeId(Long recipeId);

}