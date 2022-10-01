package run.ward.mmz.mapper.post;

import run.ward.mmz.domain.post.Ingredient;
import run.ward.mmz.dto.request.post.patch.IngredientPatchDto;
import run.ward.mmz.dto.request.post.IngredientPostDto;
import run.ward.mmz.dto.respones.IngredientResponseDto;
import run.ward.mmz.mapper.post.common.RecipeElementMapper;

import java.util.List;

public interface IngredientMapper extends RecipeElementMapper<Ingredient, IngredientPostDto, IngredientResponseDto> {

    IngredientPatchDto toPatchDto(Ingredient ingredient);
    List<IngredientPatchDto> toPatchDto(List<Ingredient> ingredientList);
}
