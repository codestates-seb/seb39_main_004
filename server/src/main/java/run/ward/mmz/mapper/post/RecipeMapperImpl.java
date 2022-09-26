package run.ward.mmz.mapper.post;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.file.Image.ThumbNailImage;
import run.ward.mmz.domain.post.*;
import run.ward.mmz.dto.post.RecipeDto;

import java.util.Set;

@Component
public class RecipeMapperImpl implements RecipeMapper{


    @Override
    public Recipe toEntity(RecipeDto.Request request) {




        return null;
    }

    @Override
    public RecipeDto.Response toResponse(Recipe recipe) {
        return null;
    }

    @Override
    public Set<Recipe> toEntity(Set<RecipeDto.Request> q) {
        return null;
    }

    @Override
    public Set<RecipeDto.Response> toResponse(Set<Recipe> e) {
        return null;
    }
}
