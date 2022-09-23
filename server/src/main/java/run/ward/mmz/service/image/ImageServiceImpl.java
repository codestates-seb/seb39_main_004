package run.ward.mmz.service.image;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import run.ward.mmz.domain.file.File;
import run.ward.mmz.domain.file.Image.ImageType;
import run.ward.mmz.repository.FileRepository;
import run.ward.mmz.dto.FileDto;
import run.ward.mmz.handler.file.FileHandler;
import run.ward.mmz.mapper.image.ImageMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final FileRepository fileRepository;
    private final ImageMapper imageMapper;
    private final FileHandler fileHandler;

    @Transactional
    @Override
    public void upload(MultipartHttpServletRequest request) {

        String key = "file";
        List<MultipartFile> files = request.getFiles(key);
        List<String> extensions = ImageType.EXTENSIONS;

        List<FileDto> fileDtoList =  fileHandler.parseFileInfo(files, extensions);
        fileRepository.saveAll(imageMapper.fileDtoListToImageList(fileDtoList));

    }

    public File getFileUrl(Long fileId){

        return fileRepository.findById(fileId).orElseThrow();
    }

    public List<File> getAllFileUrl(){

        return fileRepository.findAll();
    }








}
