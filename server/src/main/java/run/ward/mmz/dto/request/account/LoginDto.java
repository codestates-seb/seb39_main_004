package run.ward.mmz.dto.request.account;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginDto {

    private String email;
    private String password;

}
