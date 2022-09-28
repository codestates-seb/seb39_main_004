package run.ward.mmz.dto.request.patch;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DirectionPatchDto {

    private Long id;
    private int index;
    private String imgDirectionUrl;
    private String body;
}
