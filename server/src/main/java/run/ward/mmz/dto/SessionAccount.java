package run.ward.mmz.dto;

import lombok.Getter;
import run.ward.mmz.domain.account.Account;

import java.io.Serializable;

@Getter
public class SessionAccount implements Serializable {

    private String name;
    private String email;
    private String picture;

    public SessionAccount(Account account){
        this.name = account.getName();
        this.email = account.getEmail();
        this.picture = account.getPicture();

    }

}