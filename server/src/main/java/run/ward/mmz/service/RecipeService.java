package run.ward.mmz.service;

import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.service.common.CrudService;

import java.util.List;

public interface RecipeService extends CrudService<Recipe> {

    List<Recipe> findAll();

}
