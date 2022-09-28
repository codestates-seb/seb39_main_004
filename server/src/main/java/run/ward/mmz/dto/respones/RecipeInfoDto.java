package run.ward.mmz.dto.respones;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RecipeInfoDto {

    private Long id;
    private String title;
    private String imgThumbNailUrl;
    private String stars;
    private List<TagResponseDto> tags;

}
