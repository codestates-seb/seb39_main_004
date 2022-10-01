package run.ward.mmz.dto.auth;

import lombok.Data;
import run.ward.mmz.domain.account.Account;

import java.io.Serializable;

@Data
public class SessionUser implements Serializable {

    private String name;
    private String email;

    public SessionUser(Account account){
        this.name = account.getName();
        this.email = account.getEmail();
    }

}
