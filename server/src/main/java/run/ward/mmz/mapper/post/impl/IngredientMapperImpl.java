package run.ward.mmz.mapper.post.impl;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.post.Ingredient;
import run.ward.mmz.dto.request.IngredientPostDto;
import run.ward.mmz.dto.respones.IngredientResponseDto;
import run.ward.mmz.mapper.post.IngredientMapper;

import java.util.ArrayList;
import java.util.List;

@Component
public class IngredientMapperImpl implements IngredientMapper {


    @Override
    public Ingredient toEntity(IngredientPostDto ingredientPostDto) {

        if (ingredientPostDto == null) {
            return null;
        }

        return Ingredient.builder()
                .index(ingredientPostDto.getIndex())
                .amount(ingredientPostDto.getAmount())
                .isEssential(ingredientPostDto.isEssential())
                .name(ingredientPostDto.getName())
                .build();
    }

    @Override
    public List<Ingredient> toEntity(List<IngredientPostDto> ingredientPostDtoList) {

        if(ingredientPostDtoList.isEmpty()){
            return new ArrayList<>();
        }

        List<Ingredient> ingredients = new ArrayList<>();

        for (IngredientPostDto ingredientPostDto : ingredientPostDtoList) {
            ingredients.add(toEntity(ingredientPostDto));
        }

        return ingredients;
    }

    @Override
    public IngredientResponseDto toResponseDto(Ingredient ingredient) {

        if(ingredient == null) {
            return null;
        }

        return IngredientResponseDto.builder()
                .index(ingredient.getIndex())
                .isEssential(ingredient.isEssential())
                .name(ingredient.getName())
                .amount(ingredient.getAmount())
                .build();

    }

    @Override
    public List<IngredientResponseDto> toResponseDto(List<Ingredient> ingredientList) {

        if (ingredientList.isEmpty()) {
            return new ArrayList<>();
        }

        List<IngredientResponseDto> ingredientResponseDtoList = new ArrayList<>();

        for(Ingredient ingredient : ingredientList){
            ingredientResponseDtoList.add(toResponseDto(ingredient));
        }

        return ingredientResponseDtoList;
    }
}
