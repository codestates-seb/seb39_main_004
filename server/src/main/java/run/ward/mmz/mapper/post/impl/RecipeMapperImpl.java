package run.ward.mmz.mapper.post.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.*;
import run.ward.mmz.dto.request.post.patch.RecipePatchDto;
import run.ward.mmz.dto.request.post.RecipePostDto;
import run.ward.mmz.dto.respones.RecipeInfoDto;
import run.ward.mmz.dto.respones.RecipeResponseDto;
import run.ward.mmz.mapper.account.AccountMapper;
import run.ward.mmz.mapper.post.*;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RecipeMapperImpl implements RecipeMapper {

    private final DirectionMapper directionMapper;
    private final IngredientMapper ingredientMapper;
    private final TagMapper tagMapper;
    private final ReviewMapper reviewMapper;
    private final AccountMapper accountMapper;

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
                .owner(accountMapper.toInfoDto(recipe.getOwner()))
                .id(recipe.getId())
                .title(recipe.getTitle())
                .body(recipe.getBody())
                .category(recipe.getCategory())
                .imgThumbNailUrl(recipe.getImgThumbNail().getFileName())
                .stars(String.format("%.2f", recipe.getStars()))
                .views(recipe.getViews())
                .createDate(recipe.getCreateDate().toString())
                .modifyDate(recipe.getModDate().toString())
                .directions(directionMapper.toResponseDto(recipe.getDirections()))
                .ingredients(ingredientMapper.toResponseDto(recipe.getIngredients()))
                .tags(tagMapper.toResponseDto(recipe.getTagList()))
                .reviews(reviewMapper.toResponseDto(recipe.getReviews()))
                .build();
    }

    @Override
    public RecipeInfoDto toInfoDto(Recipe recipe) {

        if (recipe == null) {
            return null;
        }

        return RecipeInfoDto.builder()
                .reviewCount(recipe.getReviews().size())
                .ownerId(recipe.getOwner().getId())
                .ownerNickName(recipe.getOwner().getName())
                .id(recipe.getId())
                .title(recipe.getTitle())
                .views(recipe.getViews())
                .imgThumbNailUrl(recipe.getImgThumbNail().getFileName())
                .stars(String.format("%.2f", recipe.getStars()))
                .tags(tagMapper.toResponseDto(recipe.getTagList()))
                .createDate(recipe.getCreateDate())
                .build();
    }

    @Override
    public List<RecipeInfoDto> toInfoDto(List<Recipe> recipeList) {
        return recipeList.stream()
                .map(this::toInfoDto)
                .collect(Collectors.toList());
    }

    @Override
    public RecipePatchDto toPatchDto(Recipe recipe) {

        if (recipe == null) {
            return null;
        }

        return RecipePatchDto.builder()
                .title(recipe.getTitle())
                .body(recipe.getBody())
                .category(recipe.getCategory())
                .imgThumbNailUrl(recipe.getImgThumbNail().getFileName())
                .directions(directionMapper.toPatchDto(recipe.getDirections()))
                .ingredients(ingredientMapper.toPatchDto(recipe.getIngredients()))
                .tags(tagMapper.toPatchDto(recipe.getTagList()))
                .build();
    }
}
