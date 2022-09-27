package run.ward.mmz.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;


@Getter
@NoArgsConstructor
public class RecipePostDto{


    private String title;
    private String category;
    private String level;

    private List<IngredientPostDto> ingredients;
    private List<DirectionPostDto> directions;
    private List<RecipeTagPostDto> recipeTags;

}
