package run.ward.mmz.service;

import org.springframework.web.multipart.MultipartFile;
import run.ward.mmz.domain.file.Files;

import java.util.List;

public interface ImageService {

    List<Files> saveAll(List<MultipartFile> multipartFiles);
    Files save(MultipartFile multipartFile);
    Files save(Files files);
}
