package run.ward.mmz.dto.respones;

import io.swagger.annotations.ApiParam;
import lombok.*;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountInfoDto {

    private Long id;
    private String name;
    private String bio;
    private String email;
    private String imgProfileUrl;
}
