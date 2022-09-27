package run.ward.mmz.dto.respones;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RecipeResponseDto {

    private Long id;
    private String title;
    private String category;
    private String imgThumbNailUrl;
    private String level;
    private boolean isBookmarked;
    private String star;
    private int views;
    private String createDate;
    private String modifyDate;

    private List<DirectionResponseDto> directions;
    private List<IngredientResponseDto> ingredients;
    private List<TagResponseDto> tags;
    private List<ReviewResponseDto> reviews;



}
