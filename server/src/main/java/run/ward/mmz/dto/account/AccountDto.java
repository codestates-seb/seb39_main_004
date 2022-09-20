package run.ward.mmz.dto.account;

import javax.persistence.*;

public class AccountDto {


    public static class Response{

    }

    public static class Info{

        private Long id;
        private String name;
        private Long bio;
        private String email;
        private String profileImageUrl;


    }

}
