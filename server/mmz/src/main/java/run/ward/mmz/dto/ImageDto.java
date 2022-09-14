package run.ward.mmz.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import run.ward.mmz.domain.image.Image;


@Builder
@Getter
public class ImageDto {


    private String postImageUrl;

}
