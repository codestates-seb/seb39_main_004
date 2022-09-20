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
public class File extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String filePath;

}
