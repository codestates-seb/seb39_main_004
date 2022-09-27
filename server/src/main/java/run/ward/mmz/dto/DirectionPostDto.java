package run.ward.mmz.dto;

import lombok.Data;
import lombok.Getter;
import run.ward.mmz.domain.file.Files;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
public class DirectionPostDto {

    private int index;
    private String body;

}
