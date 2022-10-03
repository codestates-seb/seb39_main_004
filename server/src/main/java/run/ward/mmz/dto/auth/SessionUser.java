package run.ward.mmz.dto.auth;

import lombok.Builder;
import lombok.Data;
import run.ward.mmz.domain.account.Account;

import java.io.Serializable;

@Data
public class SessionUser implements Serializable {

    private Long id;
    private String name;
    private String imgProfileUrl;
    private String email;
    private String bio;
    private boolean isNew;


    @Builder
    public SessionUser(Account user){
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.bio = user.getBio();
        this.imgProfileUrl = user.getImgProfileUrl();
        this.isNew = user.isNew();
    }


}
