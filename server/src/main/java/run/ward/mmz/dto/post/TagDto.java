package run.ward.mmz.dto.post;

import lombok.Data;
import lombok.NoArgsConstructor;


import java.io.Serializable;

public class TagDto{

    @Data
    @NoArgsConstructor
    public static class Request{
        private String name;
    }

    @Data
    @NoArgsConstructor
    public static class Response implements Serializable {
        private Long id;
        private String name;
    }

}
