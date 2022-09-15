package run.ward.mmz.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.nio.file.Path;

@Getter
@NoArgsConstructor
public class FileDto {

    private String fileName;
    private String filePath;
    private String contentType;
    private Long fileSize;

    @Builder
    public FileDto(String fileName, String filePath, String contentType, Long fileSize) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.contentType = contentType;
        this.fileSize = fileSize;
    }
}
