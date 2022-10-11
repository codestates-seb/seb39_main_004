package run.ward.mmz.dto.respones;

import lombok.Builder;

import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class ReviewResponseDto {

    private String recipeImgThumbNail;
    private String recipeTitle;
    private AccountInfoDto owner;
    private Long id;
    private String body;
    private int stars;
    private Long recipeId;
    private String createDate;
    private String modifyDate;
}
