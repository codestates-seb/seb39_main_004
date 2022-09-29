package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.Tag;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.RecipeRepository;
import run.ward.mmz.service.*;

import java.util.*;

@Service
@RequiredArgsConstructor

public class RecipeServiceImpl implements RecipeService {

    private final RecipeTagService recipeTagService;
    private final RecipeRepository recipeRepository;
    private final DirectionService directionService;
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
        return findVerifiedEntity(id);
    }

    @Override
    public void deleteById(Long id) {
        recipeRepository.deleteById(id);
    }

    @Override
    public Recipe update(Long id, Recipe recipe) {

        Recipe updateRecipe = recipeRepository.getReferenceById(id);


        return null;
    }

    @Override
    public void verifyExistsId(Long id) {
        if (!recipeRepository.existsById(id))
            throw new CustomException(ExceptionCode.RECIPE_NOT_FOUND);
    }

    @Override
    public Recipe findVerifiedEntity(Long id) {

        return recipeRepository.findById(id).orElseThrow(
                () -> new CustomException(ExceptionCode.RECIPE_NOT_FOUND)
        );
    }

    @Override
    public void verifyAccessOwner(Long recipeId, Long accountId) {
        Long ownerId = findVerifiedEntity(recipeId).getOwner().getId();
        if (!Objects.equals(ownerId, accountId))
            throw new CustomException(ExceptionCode.USER_ACCESS_DENIED);
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

    @Override
    @Transactional(readOnly = true)
    public Page<Recipe> findAllByCategory(int page, int size, String category, String orderBy, String sort) {

        Sort bySort = Sort.by(orderBy).descending();

        if (!sort.equals("dec"))
            bySort = bySort.ascending();

        return recipeRepository.findAllByCategory(
                category,
                PageRequest.of(page - 1, size, bySort)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Recipe> findAllBySearch(int page, int size, String search, String orderBy, String sort) {

        Sort bySort = Sort.by(orderBy).descending();

        if (!sort.equals("dec"))
            bySort = bySort.ascending();

        Set<Recipe> recipeSet = new HashSet<>();
        recipeSet.addAll(recipeRepository.findAllByTitleContaining(search));
        recipeSet.addAll(recipeTagService.findAllByTagName(search));

        List<Recipe> recipeList = List.copyOf(recipeSet);

        return new PageImpl<>(
                recipeList,
                PageRequest.of(page - 1, size, bySort),
                recipeSet.size()
        );

    }

    @Override
    @Transactional(readOnly = true)
    public Page<Recipe> findAllByAccountId(int page, int size, Long accountId, String orderBy, String sort) {

        Sort bySort = Sort.by(orderBy).descending();

        if (!sort.equals("dec"))
            bySort = bySort.ascending();

        return recipeRepository.findAllByOwnerId(
                accountId,
                PageRequest.of(page - 1, size, Sort.by(orderBy).descending())
        );
    }
}
