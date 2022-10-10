package run.ward.mmz.service.post.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.post.RecipeRepository;
import run.ward.mmz.service.post.*;

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
    @Transactional
    public void deleteById(Long id) {
        recipeRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Recipe update(Long id, Recipe recipe) {

        Recipe updateRecipe = findById(id);

        Files imgThumbNail = new Files();

        if(recipe.getImgThumbNail() != null){
            imgThumbNail = recipe.getImgThumbNail();
        }
        else{
            imgThumbNail = updateRecipe.getImgThumbNail();
        }


        updateRecipe.updateRecipe(
                recipe.getTitle(),
                recipe.getBody(),
                recipe.getCategory(),
                imgThumbNail,
                ingredientService.saveAll(recipe.getIngredients()),
                directionService.saveAll(recipe.getDirections())
        );


        return updateRecipe;
    }

    @Override
    @Transactional(readOnly = true)
    public void verifyExistsId(Long id) {
        if (!recipeRepository.existsById(id))
            throw new CustomException(ExceptionCode.RECIPE_NOT_FOUND);
    }

    @Override
    @Transactional(readOnly = true)
    public Recipe findVerifiedEntity(Long id) {

        return recipeRepository.findById(id).orElseThrow(
                () -> new CustomException(ExceptionCode.RECIPE_NOT_FOUND)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public void verifyAccessOwner(Long recipeId, Long accountId) {
        Long ownerId = findVerifiedEntity(recipeId).getOwner().getId();
        if (!Objects.equals(ownerId, accountId))
            throw new CustomException(ExceptionCode.USER_ACCESS_DENIED);
    }

    @Override
    @Transactional(readOnly = true)
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
    public Page<Recipe> findAll(int page, int size, String orderBy, String sort) {

        Sort bySort = Sort.by(orderBy).descending();

        if (!sort.equals("dec"))
            bySort = bySort.ascending();

        return recipeRepository.findAll(
                PageRequest.of(page - 1, size, bySort)
        );
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

        Pageable pageable = PageRequest.of(page - 1, size);

        Set<Recipe> recipeSet = new HashSet<>();
        recipeSet.addAll(recipeRepository.findAllByTitleContaining(search));
        recipeSet.addAll(recipeTagService.findAllByTagName(search));

        List<Recipe> mergedList = new ArrayList<>(List.copyOf(recipeSet));

        Comparator<Recipe> comparator = (o1, o2) -> sort.equals("dec") ?
                (int) (o2.getId() - o1.getId()) :
                (int) (o1.getId() - o2.getId());

        switch (search) {
            case "id":
                comparator = (o1, o2) -> sort.equals("dec") ?
                        (int) (o2.getId() - o1.getId()) :
                        (int) (o1.getId() - o2.getId());
                break;
            case "stars":
                comparator = (o1, o2) -> sort.equals("dec") ?
                        (int) (o2.getStars() - o1.getStars()) :
                        (int) (o1.getStars() - o2.getStars());
                break;
            case "views":
                comparator = (o1, o2) -> sort.equals("dec") ?
                        (int) (o2.getViews() - o1.getViews()) :
                        (int) (o1.getViews() - o2.getViews());
                break;
        }

        mergedList.sort(comparator);

        return new PageImpl<>(mergedList, pageable, mergedList.size());

    }

    @Override
    @Transactional(readOnly = true)
    public Page<Recipe> findAllByOwnerId(int page, int size, Long accountId, String orderBy, String sort) {

        Sort bySort = Sort.by(orderBy).descending();

        if (!sort.equals("dec"))
            bySort = bySort.ascending();

        return recipeRepository.findAllByOwnerId(
                accountId,
                PageRequest.of(page - 1, size, bySort)
        );
    }

    @Override
    @Transactional
    public void deleteAllDirection(Long id) {
        findById(id).removeAllDirection();
    }

    @Override
    @Transactional
    public void deleteAllIngredient(Long id) {
        findById(id).removeAllIngredients();
    }

    @Override
    @Transactional
    public void deleteAllRecipeTag(Long id) {
        findById(id).removeAllRecipeTag();
    }


}
