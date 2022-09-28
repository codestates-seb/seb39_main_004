package run.ward.mmz.dto.request.post;

import lombok.*;
import run.ward.mmz.domain.file.Files;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DirectionPostDto {

    private int index;
    private String body;

}
