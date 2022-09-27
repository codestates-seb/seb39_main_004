package run.ward.mmz.mapper.post.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.domain.post.Ingredient;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.RecipeTag;
import run.ward.mmz.dto.request.RecipePostDto;
import run.ward.mmz.dto.respones.RecipeResponseDto;
import run.ward.mmz.mapper.post.DirectionMapper;
import run.ward.mmz.mapper.post.IngredientMapper;
import run.ward.mmz.mapper.post.RecipeMapper;
import run.ward.mmz.mapper.post.TagMapper;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RecipeMapperImpl implements RecipeMapper {

    private final DirectionMapper directionMapper;
    private final IngredientMapper ingredientMapper;
    private final TagMapper recipeTagMapper;

    @Override
    public Recipe toEntity(Account owner, RecipePostDto recipePostDto, Files imgThumbNail, List<Ingredient> ingredients, List<Direction> directionList) {

        if (recipePostDto == null) {
            return null;
        }

        return Recipe.createRecipe(recipePostDto.getTitle(),
                recipePostDto.getBody(),
                recipePostDto.getCategory(),
                imgThumbNail,
                owner,
                recipePostDto.getLevel(),
                ingredients,
                directionList
        );
    }

    @Override
    public RecipeResponseDto toResponseDto(Recipe recipe) {

        if (recipe == null) {
            return null;
        }

        return RecipeResponseDto.builder()
                .id(recipe.getId())
                .title(recipe.getTitle())
                .category(recipe.getCategory())
                .imgThumbNailUrl(recipe.getImgThumbNail().getFileName())
                .level(recipe.getLevel())
                .isBookmarked(recipe.isBookmarked())
                .star(recipe.getStars())
                .views(recipe.getViews())
                .createDate(recipe.getCreateDate())
                .modifyDate(recipe.getModDate())
                .directions(directionMapper.toResponseDto(recipe.getDirections()))
                .ingredients(ingredientMapper.toResponseDto(recipe.getIngredients()))
                .build();
    }
}
