package run.ward.mmz.dto.respones;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewResponseDto {

    private Long id;
    private String body;
    private int stars;
    private String createDate;
    private String modifyDate;
}
