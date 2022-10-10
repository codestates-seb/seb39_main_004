package run.ward.mmz.service.post;

import org.springframework.web.multipart.MultipartFile;
import run.ward.mmz.domain.file.Files;

import java.util.List;

public interface ImageService {

    Files findByName(String fileName);
    List<Files> saveAll(List<MultipartFile> multipartFiles);
    Files save(MultipartFile multipartFile);
    Files save(Files files);
}
