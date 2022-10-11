package run.ward.mmz.dto.respones;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@Builder
public class RecipeInfoDto {

    private Long ownerId;
    private String ownerNickName;
    private Long id;
    private String title;
    private String imgThumbNailUrl;
    private String stars;
    private int reviewCount;
    private int views;
    private String createDate;
    private boolean isBookmarked;
    private List<TagResponseDto> tags;

}
