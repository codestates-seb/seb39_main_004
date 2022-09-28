package run.ward.mmz.service.common;

import java.util.List;

public interface RecipeElementService<T> extends CrudService<T> {

    void deleteAll(List<T> tList);
    List<T> findAllByRecipeId(Long recipeId);
}
