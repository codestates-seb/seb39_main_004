package run.ward.mmz.service.post.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Ingredient;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.post.IngredientRepository;
import run.ward.mmz.service.post.IngredientService;

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
        return findVerifiedEntity(id);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        ingredientRepository.deleteById(id);
    }

    @Override
    public Ingredient update(Long id, Ingredient ingredient) {
        return null;
    }

    @Override
    public void verifyExistsId(Long id) {
        if(!ingredientRepository.existsById(id))
            throw new CustomException(ExceptionCode.INGREDIENT_NOT_FOUND);
    }

    @Override
    public Ingredient findVerifiedEntity(Long id) {
        ingredientRepository.findById(id).orElseThrow(
                () -> new CustomException(ExceptionCode.INGREDIENT_NOT_FOUND)
        );
        return null;
    }

    @Override
    @Transactional
    public void deleteAll(List<Ingredient> ingredients) {
        ingredientRepository.deleteAll(ingredients);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Ingredient> findAllByRecipeId(Long recipeId) {
        return ingredientRepository.findAllByRecipeId(recipeId);
    }

}
