package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.repository.RecipeRepository;
import run.ward.mmz.service.DirectionService;
import run.ward.mmz.service.IngredientService;
import run.ward.mmz.service.RecipeService;
import run.ward.mmz.service.RecipeTagService;

import java.util.List;

@Service
@RequiredArgsConstructor

public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;

    private final DirectionService  directionService;
    private final IngredientService ingredientService;
    private final RecipeTagService recipeTagService;

    @Override
    public List<Recipe> saveAll(List<Recipe> list) {
        return null;
    }

    @Override
    @Transactional
    public Recipe save(Recipe recipe) {

        recipeTagService.saveAll(recipe.getRecipeTags());
        ingredientService.saveAll(recipe.getIngredients());
        directionService.saveAll(recipe.getDirections());
        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe findById(Long id) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public Recipe update(Long id, Recipe recipe) {
        return null;
    }

    @Override
    public void verifyExistsId(Long id) {

    }

    @Override
    public Recipe findVerifiedEntity(Long id) {
        return null;
    }
}
