package run.ward.mmz.dto.request.post;

import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@Builder
public class RecipePostDto{


    private String title;
    private String category;
    private String level;
    private String body;
    private List<IngredientPostDto> ingredients;
    private List<DirectionPostDto> directions;
    private List<TagPostDto> tags;

}
