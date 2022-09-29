package run.ward.mmz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;


public class AccountDto {

    @Getter
    @AllArgsConstructor
    public static class Post {


        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String nickname;

        @NotBlank
        private String password;

        private List<String> roles;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {

        private long id;

        private String nickname;

        public void setAccountId(long id) {
            this.id = id;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long id;
        private String email;
        private String nickname;
    }
}
