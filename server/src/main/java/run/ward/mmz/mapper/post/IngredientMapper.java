package run.ward.mmz.mapper.post;

import run.ward.mmz.domain.post.Ingredient;
import run.ward.mmz.dto.request.IngredientPostDto;
import run.ward.mmz.dto.respones.IngredientResponseDto;
import run.ward.mmz.mapper.post.common.RecipeElementMapper;

public interface IngredientMapper extends RecipeElementMapper<Ingredient, IngredientPostDto, IngredientResponseDto> {

}
