package run.ward.mmz.dto.request.post;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecipePostDto{


    private String title;
    private String category;
    private String body;
    private List<IngredientPostDto> ingredients;
    private List<DirectionPostDto> directions;
    private List<TagPostDto> tags;

}
