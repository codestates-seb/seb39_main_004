package run.ward.mmz.dto.request.patch;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DirectionPatchDto {

    private Long id;
    private int index;
    private String imgDirectionUrl;
    private String body;
}
