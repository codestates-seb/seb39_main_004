package run.ward.mmz.dto.respones;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DirectionResponseDto {
    private int index;
    private String imgDirectionUrl;
    private String body;
}
