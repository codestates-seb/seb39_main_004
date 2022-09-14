package run.ward.mmz.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


public class ImageDto {

    @Data
    public static class Request {
        private MultipartHttpServletRequest request;
    }

}
