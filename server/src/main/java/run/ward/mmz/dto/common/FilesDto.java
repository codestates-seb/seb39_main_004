package run.ward.mmz.dto.common;

import lombok.*;

@Getter
@NoArgsConstructor
public class FilesDto {


    private String filePath;
    private String fileName;
    private String originFileName;
    private String contentType;
    private Long fileSize;

    @Builder
    public FilesDto(String filePath, String fileName, String originFileName, String contentType, Long fileSize) {
        this.filePath = filePath;
        this.fileName = fileName;
        this.originFileName = originFileName;
        this.contentType = contentType;
        this.fileSize = fileSize;
    }
}
