package run.ward.mmz.mapper.file;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.dto.common.FilesDto;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class FilesMapperImpl implements FilesMapper {

    @Override
    public List<Files> fileDtoListToImageList(List<FilesDto> filesDtoList) {
        if (filesDtoList == null)
            return Collections.emptyList();

        List<Files> imageList = new ArrayList<>();
        for(FilesDto filesDto : filesDtoList)
            imageList.add(fileDtoToImage(filesDto));

        return imageList;
    }

    public Files fileDtoToImage(FilesDto filesDto) {
        if (filesDto == null)
            return null;


        return Files.builder()
                .filePath(filesDto.getFilePath())
                .fileName(filesDto.getFileName())
                .originFileName(filesDto.getOriginFileName())
                .fileSize(filesDto.getFileSize())
                .contentType(filesDto.getContentType())
                .build();


    }
}
