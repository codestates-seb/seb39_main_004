package run.ward.mmz.mapper.post;


import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.*;
import run.ward.mmz.dto.request.RecipePostDto;
import run.ward.mmz.dto.respones.RecipeInfoDto;
import run.ward.mmz.dto.respones.RecipeResponseDto;

import java.util.List;

public interface RecipeMapper {
    Recipe toEntity(Account owner, RecipePostDto recipePostDto, Files imgThumbNail, List<Ingredient> ingredients, List<Direction> directionList);
    RecipeResponseDto toResponseDto(Recipe recipe, List<Tag> tagList);
    RecipeInfoDto toInfoDto(Recipe recipe, List<Tag> tagList);

}
