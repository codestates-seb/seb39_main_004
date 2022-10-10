package run.ward.mmz.service.post.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.file.Image.ImageType;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.handler.file.FileHandler;
import run.ward.mmz.mapper.file.FilesMapper;
import run.ward.mmz.repository.post.FileRepository;
import run.ward.mmz.service.post.ImageService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final FileHandler fileHandler;
    private final FilesMapper filesMapper;
    private final FileRepository fileRepository;

    @Override
    public Files findByName(String fileName) {
        return fileRepository.findByFileName(fileName).orElseThrow(
                () ->  new CustomException(ExceptionCode.FILE_NOT_FOUND)
        );
    }

    @Override
    public List<Files> saveAll(List<MultipartFile> multipartFiles) {
        if(multipartFiles == null)
            return null;
        List<String> imgExtension = ImageType.EXTENSIONS;
        List<Files> files = filesMapper.fileDtoListToImageList(fileHandler.parseFileInfo(multipartFiles, imgExtension));

        return fileRepository.saveAll(files);
    }

    @Override
    public Files save(MultipartFile multipartFile) {

        List<String> imgExtension = ImageType.EXTENSIONS;
        if(multipartFile == null)
            return null;
        Files file = filesMapper.fileDtoToImage(fileHandler.parseFileInfo(multipartFile, imgExtension));

        return fileRepository.save(file);
    }

    @Override
    @Transactional
    public Files save(Files files) {
        return fileRepository.save(files);
    }
}
