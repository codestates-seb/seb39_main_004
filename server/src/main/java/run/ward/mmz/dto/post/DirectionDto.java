package run.ward.mmz.dto.post;

import java.io.Serializable;

public class DirectionDto {

    public static class Request{
        private int index;
        private String body;
        private String directionImgUrl;

    }

    public static class Response implements Serializable {
        private int index;
        private String body;
        private String directionImgUrl;
    }

}
