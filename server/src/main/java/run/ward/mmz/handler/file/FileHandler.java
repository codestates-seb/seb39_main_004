package run.ward.mmz.handler.file;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import run.ward.mmz.dto.common.FilesDto;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@Component
public class FileHandler {

    @Value("${file.path}")
    private String uploadFolder;

    public List<FilesDto> parseFileInfo(List<MultipartFile> files, List<String> extensions) {
        if (ObjectUtils.isEmpty(files)) {
            throw new CustomException(ExceptionCode.FILE_NOT_FOUND);
        }

        List<FilesDto> filesDtoList = new ArrayList<>();

        for (MultipartFile file : files) {

            String contentType = file.getContentType();
            String originalFilename = file.getOriginalFilename();

            if (ObjectUtils.isEmpty(contentType) || ObjectUtils.isEmpty(originalFilename)){
                throw new CustomException(ExceptionCode.FILE_UPLOAD_FAILED);
            }


            String ext = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

            if (extensions.contains(ext.toLowerCase()) || extensions.contains(ext.toUpperCase())) {

                UUID uuid = UUID.randomUUID();

                String fileName = uuid + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(uploadFolder + fileName);

                try {
                    Files.write(filePath, file.getBytes());

                    FilesDto filesDto = FilesDto.builder()
                            .originFileName(originalFilename)
                            .fileName(fileName)
                            .filePath(filePath.toString())
                            .fileSize(file.getSize())
                            .contentType(contentType)
                            .build();
                    filesDtoList.add(filesDto);

                } catch (Exception e) {
                    throw new CustomException(ExceptionCode.FILE_UPLOAD_FAILED);
                }
            }
            else{
                throw new CustomException(ExceptionCode.FILE_EXTENSION_INVALID);
            }

        }
        return filesDtoList;
    }

    public FilesDto parseFileInfo(MultipartFile file, List<String> extensions) {
        if (file == null) {
            throw new CustomException(ExceptionCode.FILE_NOT_FOUND);
        }

        String contentType = file.getContentType();
        String originalFilename = file.getOriginalFilename();

        if (ObjectUtils.isEmpty(contentType) || ObjectUtils.isEmpty(originalFilename)) {
            throw new CustomException(ExceptionCode.FILE_UPLOAD_FAILED);
        }

        String ext = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

        FilesDto filesDto = null;

        if (extensions.contains(ext.toLowerCase()) || extensions.contains(ext.toUpperCase())) {

            UUID uuid = UUID.randomUUID();

            String fileName = uuid + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadFolder + fileName);

            try {
                Files.write(filePath, file.getBytes());

                filesDto = FilesDto.builder()
                        .originFileName(originalFilename)
                        .fileName(fileName)
                        .filePath(filePath.toString())
                        .fileSize(file.getSize())
                        .contentType(contentType)
                        .build();

            } catch (Exception e) {
                throw new CustomException(ExceptionCode.FILE_UPLOAD_FAILED);
            }
        }
        else{
            throw new CustomException(ExceptionCode.FILE_EXTENSION_INVALID);
        }

        return filesDto;
    }


}
