package run.ward.mmz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import run.ward.mmz.domain.image.ImageRepository;
import run.ward.mmz.dto.FileDto;
import run.ward.mmz.handler.file.FileHandler;
import run.ward.mmz.mapper.ImageMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;
    private final FileHandler fileHandler;

    @Transactional
    @Override
    public void upload(MultipartHttpServletRequest request) {

        String key = "file";
        List<MultipartFile> files = request.getFiles(key);
        List<String> extensions = ImageExtension.EXTENSIONS;

        List<FileDto> fileDtoList =  fileHandler.parseFileInfo(files, extensions);
        imageRepository.saveAll(imageMapper.fileDtoListToImageList(fileDtoList));

    }




}
