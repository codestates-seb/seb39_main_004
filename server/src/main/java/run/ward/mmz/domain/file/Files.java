package run.ward.mmz.domain.file;


import lombok.*;
import run.ward.mmz.domain.auditable.Auditable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
@Getter
@Table(name = "file")
@Setter
@NoArgsConstructor
public class Files extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String filePath;

    @NotNull
    private String fileName;

    @NotNull
    private String originFileName;

    @NotNull
    private String contentType;

    @NotNull
    private Long fileSize;

    @Builder
    public Files(String filePath, String fileName, String originFileName, String contentType, Long fileSize) {
        this.filePath = filePath;
        this.fileName = fileName;
        this.originFileName = originFileName;
        this.contentType = contentType;
        this.fileSize = fileSize;
    }

}
