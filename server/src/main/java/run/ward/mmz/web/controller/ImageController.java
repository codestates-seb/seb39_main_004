package run.ward.mmz.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import run.ward.mmz.service.image.ImageService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<?> upload(MultipartHttpServletRequest request){
        // Todo : MultiPart 형식으로 이미지를 업로드 합니다.
        // enctype="multipart/form-data" 속성을 사용해야 합니다.
        imageService.upload(request);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/image/{imageId}")
    public ResponseEntity<?> getImageUrl(@RequestParam Long id) {


        return new ResponseEntity<>(imageService.getFileUrl(id), HttpStatus.OK);
    }

    @GetMapping("/images")
    public ResponseEntity<?> getAllImageUrl(){

        return new ResponseEntity<>(imageService.getAllFileUrl(), HttpStatus.OK);
    }



}
