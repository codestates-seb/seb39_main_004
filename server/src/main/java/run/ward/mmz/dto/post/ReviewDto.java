package run.ward.mmz.dto.post;

import run.ward.mmz.dto.account.AccountDto;

import java.io.Serializable;

public class ReviewDto {

    public static class Request{
        private String body;
        private int stars;
    }

    public static class Response implements Serializable {
        private int index;
        private AccountDto.Info owner;
        private String body;
        private int stars;
        private String lastModifyDate;
    }

}
