package run.ward.mmz.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import run.ward.mmz.service.image.ImageService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
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
