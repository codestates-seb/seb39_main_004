package run.ward.mmz.dto.respones;


import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DirectionResponseDto {
    private int index;
    private String imgDirectionUrl;
    private String body;
}
