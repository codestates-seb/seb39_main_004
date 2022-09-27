package run.ward.mmz.mapper.post.impl;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.post.RecipeTag;
import run.ward.mmz.dto.RecipeTagPostDto;
import run.ward.mmz.mapper.post.RecipeTagMapper;

import java.util.ArrayList;
import java.util.List;

@Component
public class RecipeTagMapperImpl implements RecipeTagMapper {

    @Override
    public RecipeTag toEntity(RecipeTagPostDto recipeTagPostDto) {

        if (recipeTagPostDto == null) {
            return null;
        }

        return RecipeTag.builder()
                .name(recipeTagPostDto.getName())
                .build();
    }

    @Override
    public List<RecipeTag> toEntity(List<RecipeTagPostDto> recipeTagPostDtoList) {

        if(recipeTagPostDtoList.isEmpty()){
            return new ArrayList<>();
        }

        List<RecipeTag> recipeTags = new ArrayList<>();

        for(RecipeTagPostDto recipeTagPostDto : recipeTagPostDtoList){
            recipeTags.add(toEntity(recipeTagPostDto));
        }

        return recipeTags;
    }
}
