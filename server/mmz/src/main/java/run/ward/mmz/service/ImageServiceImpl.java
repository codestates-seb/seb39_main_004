package run.ward.mmz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import run.ward.mmz.domain.image.Image;
import run.ward.mmz.domain.image.ImageRepository;
import run.ward.mmz.dto.ImageDto;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;

    @Value("${file.path}")
    private String uploadFolder;

    @Override
    public void upload(MultipartHttpServletRequest request) {

        List<MultipartFile> files = request.getFiles("file");
        String src = request.getParameter("src");

        for (MultipartFile file : files) {
            UUID uuid = UUID.randomUUID();
            String imageFileName = uuid + "_" + file.getOriginalFilename();

            Path imageFilePath = Paths.get(uploadFolder + imageFileName);

            try {
                Files.write(imageFilePath, file.getBytes());
            } catch (Exception e) {

            }

        }

    }
}
