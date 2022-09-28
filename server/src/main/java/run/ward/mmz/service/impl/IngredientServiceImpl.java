package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Ingredient;
import run.ward.mmz.repository.IngredientRepository;
import run.ward.mmz.service.IngredientService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IngredientServiceImpl implements IngredientService {

    private final IngredientRepository ingredientRepository;

    @Override
    public List<Ingredient> saveAll(List<Ingredient> ingredientList) {
        return ingredientRepository.saveAll(ingredientList);
    }

    @Override
    public Ingredient save(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    @Override
    public Ingredient findById(Long id) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public Ingredient update(Long id, Ingredient ingredient) {
        return null;
    }

    @Override
    public void verifyExistsId(Long id) {

    }

    @Override
    public Ingredient findVerifiedEntity(Long id) {
        return null;
    }

    @Override
    public Ingredient findByRecipeId(Long recipeId) {
        return null;
    }

    @Override
    public List<Ingredient> findAllByRecipeId(Long recipeId) {
        return null;
    }

    @Override
    public void verifyExistsRecipeId(Long recipeId) {

    }
}
