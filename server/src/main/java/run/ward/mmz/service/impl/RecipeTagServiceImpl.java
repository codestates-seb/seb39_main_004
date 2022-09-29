package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.RecipeTag;
import run.ward.mmz.domain.post.Tag;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.RecipeRepository;
import run.ward.mmz.repository.RecipeTagRepository;
import run.ward.mmz.repository.TagRepository;
import run.ward.mmz.service.RecipeTagService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeTagServiceImpl implements RecipeTagService {

    private final RecipeTagRepository recipeTagRepository;
    private final TagRepository tagRepository;
    private final RecipeRepository recipeRepository;

    @Override
    @Transactional
    public void save(List<Tag> tagList, Recipe recipe) {

        for (Tag tag : tagList) {
            RecipeTag recipeTag = RecipeTag.builder().build();
            Tag existTag = tagRepository.findByName(tag.getName());

            tag = (existTag != null) ? existTag : tag;

            recipeTag.mappingRecipe(recipe);
            recipeTag.mappingTag(tag);
            recipeTagRepository.save(recipeTag);
        }

    }

    @Override
    @Transactional(readOnly = true)
    public List<Tag> findAllByRecipeId(Long recipeId) {
        //recipeId 없을 경우 예외처리 완료
        if(!recipeRepository.existsById(recipeId))
            throw new CustomException(ExceptionCode.RECIPE_NOT_FOUND);

        return recipeRepository.getReferenceById(recipeId).getTagList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Recipe> findAllByTagName(String tagName) {
        //tagName 없을 경우 예외처리 필요 완료
        if(!tagRepository.existsByName(tagName))
            throw new CustomException(ExceptionCode.TAG_NOT_FOUND);

        return tagRepository.getReferenceByName(tagName).getRecipeList();
    }

    @Override
    public void deleteAllByRecipe(Recipe recipe) {
//        recipe.deleteAllRecipeTag();
    }


}
