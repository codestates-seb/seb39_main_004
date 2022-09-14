package run.ward.mmz.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import run.ward.mmz.dto.ImageDto;

import java.io.IOException;
import java.util.List;

@RestController
public class ImageController {

    @PostMapping("/upload")
    public ResponseEntity<?> upload(ImageDto.Request imageDto){

        List<MultipartFile> fileList = imageDto.getRequest().getFiles("file");

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
