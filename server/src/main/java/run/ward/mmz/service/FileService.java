package run.ward.mmz.service;


import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import run.ward.mmz.dto.FileDto;


public interface FileService {

    void upload(MultipartHttpServletRequest request);


}
