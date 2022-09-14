package run.ward.mmz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import run.ward.mmz.domain.image.ImageRepository;
import run.ward.mmz.handler.file.FileHandler;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final ImageRepository imageRepository;

    private final FileHandler fileHandler;

    @Override
    public void upload(MultipartHttpServletRequest request) {

        String key = "file";
        List<MultipartFile> files = request.getFiles(key);

        fileHandler.parseFileInfo(files);

        for(MultipartFile file : files )
            System.out.println("file = " + file.getContentType());

    }


}
