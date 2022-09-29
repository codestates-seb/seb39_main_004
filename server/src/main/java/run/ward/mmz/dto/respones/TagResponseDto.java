package run.ward.mmz.dto.respones;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class TagResponseDto {

    private Long id;
    private String name;

}
