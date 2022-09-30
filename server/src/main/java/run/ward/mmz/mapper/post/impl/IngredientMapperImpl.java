package run.ward.mmz.mapper.post.impl;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.post.Ingredient;
import run.ward.mmz.dto.request.post.patch.IngredientPatchDto;
import run.ward.mmz.dto.request.post.IngredientPostDto;
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
    public IngredientPatchDto toPatchDto(Ingredient ingredient) {

        if (ingredient == null) {
            return null;
        }

        return IngredientPatchDto.builder()
                .index(ingredient.getIdx())
                .name(ingredient.getName())
                .amount(ingredient.getAmount())
                .isEssential(ingredient.isEssential())
                .build();
    }

    @Override
    public List<IngredientPatchDto> toPatchDto(List<Ingredient> ingredients) {

        if(ingredients.isEmpty()){
            return new ArrayList<>();
        }

        List<IngredientPatchDto> ingredientPatchDtoList = new ArrayList<>();

        for(Ingredient ingredient : ingredients){
            ingredientPatchDtoList.add(toPatchDto(ingredient));
        }

        return ingredientPatchDtoList;
    }

    @Override
    public IngredientResponseDto toResponseDto(Ingredient ingredient) {

        if(ingredient == null) {
            return null;
        }

        return IngredientResponseDto.builder()
                .index(ingredient.getIdx())
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
