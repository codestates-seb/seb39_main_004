package run.ward.mmz.dto.respones;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@Builder
public class RecipeResponseDto {

    private AccountInfoDto owner;
    private Long id;
    private String title;
    private String body;
    private String category;
    private String imgThumbNailUrl;
    private boolean isBookmarked;
    private String stars;
    private int views;
    private String createDate;
    private String modifyDate;
    private List<DirectionResponseDto> directions;
    private List<IngredientResponseDto> ingredients;
    private List<TagResponseDto> tags;
    private List<ReviewResponseDto> reviews;

}
