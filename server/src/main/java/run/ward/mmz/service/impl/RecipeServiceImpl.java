package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.Tag;
import run.ward.mmz.repository.RecipeRepository;
import run.ward.mmz.service.DirectionService;
import run.ward.mmz.service.IngredientService;
import run.ward.mmz.service.RecipeService;
import run.ward.mmz.service.TagService;

import java.util.List;

@Service
@RequiredArgsConstructor

public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final DirectionService  directionService;
    private final IngredientService ingredientService;



    @Override
    public List<Recipe> saveAll(List<Recipe> list) {
        return null;
    }

    @Override
    @Transactional
    public Recipe save(Recipe recipe) {
        ingredientService.saveAll(recipe.getIngredients());
        directionService.saveAll(recipe.getDirections());
        return recipeRepository.save(recipe);
    }

    @Override
    @Transactional(readOnly = true)
    public Recipe findById(Long id) {
        //proxy 조회(영속성 컨텍스트에서 조회된다.)
        return recipeRepository.getReferenceById(id);
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

        return recipeRepository.findById(id).orElseThrow(
                //ToDo : exception
        );
    }

    @Override
    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    @Override
    @Transactional
    public void updateStars(Long id) {
        findVerifiedEntity(id).updateStars();
    }

    @Override
    @Transactional
    public void addViews(Long id) {
        findVerifiedEntity(id).addViews();
    }
}
