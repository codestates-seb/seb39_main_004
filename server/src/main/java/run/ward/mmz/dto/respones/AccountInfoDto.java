package run.ward.mmz.dto.respones;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountInfoDto {

    private Long id;
    private String name;
    private String bio;
    private String imgProfileUrl;
}
