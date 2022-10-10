package run.ward.mmz.service.post.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.RecipeTag;
import run.ward.mmz.domain.post.Tag;
import run.ward.mmz.repository.post.RecipeRepository;
import run.ward.mmz.repository.post.RecipeTagRepository;
import run.ward.mmz.repository.post.TagRepository;
import run.ward.mmz.service.post.RecipeTagService;

import java.util.Collections;
import java.util.List;

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

        return recipeRepository.getReferenceById(recipeId).getTagList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Recipe> findAllByTagName(String tagName) {

        if(tagRepository.getReferenceByName(tagName) == null)
            return Collections.emptyList();

        return tagRepository.getReferenceByName(tagName).getRecipeList();
    }

    @Override
    public void deleteAllByRecipe(Recipe recipe) {
//        rec.deleteAllRecipeTag();
    }

    @Override
    public void deleteAllByRecipeId(Long recipeId) {

    }


}
