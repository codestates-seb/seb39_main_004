package run.ward.mmz.mapper.post;


import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.dto.DirectionPostDto;

import java.util.List;

public interface DirectionMapper{
    Direction toEntity(DirectionPostDto dto, Files img);
    List<Direction> toEntity(List<DirectionPostDto> dtos, List<Files> imgs);
}
