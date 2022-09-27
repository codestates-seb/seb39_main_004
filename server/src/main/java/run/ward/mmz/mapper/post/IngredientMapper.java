package run.ward.mmz.mapper.post;

import run.ward.mmz.domain.post.Ingredient;
import run.ward.mmz.dto.IngredientPostDto;
import run.ward.mmz.dto.IngredientResponseDto;

import java.util.List;

public interface IngredientMapper {
    Ingredient toEntity(IngredientPostDto ingredientPostDto);
    List<Ingredient> toEntity(List<IngredientPostDto> ingredientPostDtoList);

    IngredientResponseDto toResponseDto(Ingredient ingredient);
    List<IngredientResponseDto> toResponseDto(List<Ingredient> ingredientList);

}
