package run.ward.mmz.domain.image;


import lombok.Builder;
import lombok.NoArgsConstructor;
import run.ward.mmz.domain.auditable.Auditable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Entity
public class Image extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String filePath;

    @Builder
    public Image(String filePath) {
        this.filePath = filePath;
    }
}
