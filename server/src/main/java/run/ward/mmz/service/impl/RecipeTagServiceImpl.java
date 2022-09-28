package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.RecipeTag;
import run.ward.mmz.domain.post.Tag;
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

        List<RecipeTag> recipeTagList = recipeTagRepository.findAllByRecipeId(recipeId);

        return recipeTagList.stream()
                .map(
                        recipeTag -> {
                            Optional<Tag> tag = tagRepository.findById(recipeTag.getTag().getId());
                            return tag.orElse(null);
                        })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Recipe> findAllByTagName(String tagName) {

        List<RecipeTag> recipeTagList = recipeTagRepository.findAllByTagName(tagName);

        return recipeTagList.stream()
                .map(
                        recipeTag -> {
                            Optional<Recipe> recipe = recipeRepository.findById(recipeTag.getRecipe().getId());
                            return recipe.orElse(null);
                        })
                .collect(Collectors.toList());

    }


}
