package run.ward.mmz.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


@Getter
@NoArgsConstructor
public class RecipePostDto{


    private String title;
    private String category;
    private String level;
    private String body;
    private List<IngredientPostDto> ingredients;
    private List<DirectionPostDto> directions;
    private List<TagPostDto> tags;

}
