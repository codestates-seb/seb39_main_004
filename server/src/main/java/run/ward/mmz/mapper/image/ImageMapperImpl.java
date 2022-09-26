package run.ward.mmz.mapper.image;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.file.File;
import run.ward.mmz.dto.FileDto;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class ImageMapperImpl implements ImageMapper {

    @Override
    public List<File> fileDtoListToImageList(List<FileDto> fileDtoList) {
        if (fileDtoList == null)
            return Collections.emptyList();

        List<File> imageList = new ArrayList<>();
        for(FileDto fileDto : fileDtoList )
            imageList.add(fileDtoToImage(fileDto));

        return imageList;
    }

    protected File fileDtoToImage(FileDto fileDto) {
        if (fileDto == null)
            return null;


        return File.builder()
                .contentType(fileDto.getContentType())
                .filePath(fileDto.getFilePath())
                .fileName(fileDto.getFileName())
                .originFileName(fileDto.getOriginFileName())
                .fileSize(fileDto.getFileSize())
                .build();

        File file = new File();
        file.setFilePath(fileDto.getFilePath());

        return file;


    }
}
