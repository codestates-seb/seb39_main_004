package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.repository.RecipeRepository;
import run.ward.mmz.service.RecipeService;

import java.util.List;

@Service
@RequiredArgsConstructor

public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;

    @Override
    public List<Recipe> saveAll(List<Recipe> list) {
        return null;
    }

    @Override
    @Transactional
    public Recipe save(Recipe recipe) {

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
