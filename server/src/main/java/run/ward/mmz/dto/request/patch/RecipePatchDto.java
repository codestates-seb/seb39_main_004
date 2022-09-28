package run.ward.mmz.dto.request.patch;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RecipePatchDto {

    private Long id;
    private String title;
    private String body;
    private String category;
    private String imgThumbNailUrl;
    private String level;

    private List<DirectionPatchDto> directions;
    private List<IngredientPatchDto> ingredients;
    private List<TagPatchDto> tags;

}
