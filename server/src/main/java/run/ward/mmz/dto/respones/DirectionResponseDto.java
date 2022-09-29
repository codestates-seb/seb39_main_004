package run.ward.mmz.dto.respones;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class DirectionResponseDto {
    private int index;
    private String imgDirectionUrl;
    private String body;
}
