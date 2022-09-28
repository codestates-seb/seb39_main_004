package run.ward.mmz.dto.request.patch;


import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecipePatchDto {

    private String title;
    private String body;
    private String category;
    private String imgThumbNailUrl;
    private String level;

    private List<DirectionPatchDto> directions;
    private List<IngredientPatchDto> ingredients;
    private List<TagPatchDto> tags;

}
