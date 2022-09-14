package run.ward.mmz.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import run.ward.mmz.dto.ImageDto;
import run.ward.mmz.service.ImageService;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<?> upload2(MultipartHttpServletRequest request){
        //Todo : MultiPart 형식으로 이미지를 업로드 합니다.
        // enctype="multipart/form-data" 속성을 사용해야 합니다.

        imageService.upload(request);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
