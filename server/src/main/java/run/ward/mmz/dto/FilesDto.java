package run.ward.mmz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
