package run.ward.mmz.dto.request.post.patch;


import lombok.*;

import java.util.List;

@Getter
@Builder
public class RecipePatchDto {

    private String title;
    private String body;
    private String category;
    private String imgThumbNailUrl;

    private List<DirectionPatchDto> directions;
    private List<IngredientPatchDto> ingredients;
    private List<TagPatchDto> tags;

}
