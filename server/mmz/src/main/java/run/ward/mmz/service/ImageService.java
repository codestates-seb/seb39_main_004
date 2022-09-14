package run.ward.mmz.service;


import org.springframework.web.multipart.MultipartHttpServletRequest;


public interface ImageService {

    void upload(MultipartHttpServletRequest request);

}
