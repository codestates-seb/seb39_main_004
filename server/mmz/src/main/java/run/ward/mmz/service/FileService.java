package run.ward.mmz.service;


import org.springframework.web.multipart.MultipartHttpServletRequest;


public interface FileService {

    void upload(MultipartHttpServletRequest request);
}
