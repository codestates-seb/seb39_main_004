package run.ward.mmz.mapper.post.impl;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.domain.post.Ingredient;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.RecipeTag;
import run.ward.mmz.dto.RecipePostDto;
import run.ward.mmz.mapper.post.RecipeMapper;

import java.util.List;

@Component
public class RecipeMapperImpl implements RecipeMapper {

    @Override
    public Recipe toEntity(Account owner, RecipePostDto recipePostDto, Files imgThumbNail, List<Ingredient> ingredients, List<Direction> directionList, List<RecipeTag> recipeTagList) {

        if (recipePostDto == null) {
            return null;
        }

        return Recipe.createRecipe(recipePostDto.getTitle(),
                recipePostDto.getCategory(),
                imgThumbNail,
                owner,
                recipePostDto.getLevel(),
                ingredients,
                directionList,
                recipeTagList
        );
    }
}
