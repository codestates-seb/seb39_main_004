package run.ward.mmz.mapper.post;

import run.ward.mmz.domain.post.RecipeTag;
import run.ward.mmz.dto.RecipeTagPostDto;

import java.util.List;

public interface RecipeTagMapper {

    RecipeTag toEntity(RecipeTagPostDto recipeTagPostDto);
    List<RecipeTag> toEntity(List<RecipeTagPostDto> recipeTagPostDtoList);
}
