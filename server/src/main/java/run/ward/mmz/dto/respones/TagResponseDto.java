package run.ward.mmz.dto.respones;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TagResponseDto {

    private Long id;
    private String name;

}
