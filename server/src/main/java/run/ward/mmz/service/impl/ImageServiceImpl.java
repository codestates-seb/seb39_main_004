package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.file.Image.ImageType;
import run.ward.mmz.handler.file.FileHandler;
import run.ward.mmz.mapper.file.FilesMapper;
import run.ward.mmz.repository.FileRepository;
import run.ward.mmz.service.ImageService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final FileHandler fileHandler;
    private final FilesMapper filesMapper;
    private final FileRepository fileRepository;

    @Override
    @Transactional
    public List<Files> saveAll(List<MultipartFile> multipartFiles) {

        List<String> imgExtension = ImageType.EXTENSIONS;
        List<Files> files = filesMapper.fileDtoListToImageList(fileHandler.parseFileInfo(multipartFiles, imgExtension));

        return fileRepository.saveAll(files);
    }

    @Override
    public Files save(MultipartFile multipartFile) {

        List<String> imgExtension = ImageType.EXTENSIONS;
        Files file = filesMapper.fileDtoToImage(fileHandler.parseFileInfo(multipartFile, imgExtension));

        return fileRepository.save(file);
    }

    @Override
    @Transactional
    public Files save(Files files) {
        return fileRepository.save(files);
    }
}
