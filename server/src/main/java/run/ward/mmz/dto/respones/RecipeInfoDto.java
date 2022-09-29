package run.ward.mmz.dto.respones;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@Builder
public class RecipeInfoDto {

    private Long id;
    private String title;
    private String imgThumbNailUrl;
    private String stars;
    private int views;
    private List<TagResponseDto> tags;

}
