package run.ward.mmz.mapper.post;


import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.dto.request.DirectionPostDto;
import run.ward.mmz.dto.respones.DirectionResponseDto;

import java.util.List;

public interface DirectionMapper{
    Direction toEntity(DirectionPostDto dto, Files img);
    List<Direction> toEntity(List<DirectionPostDto> dtos, List<Files> imgs);

    DirectionResponseDto toResponseDto(Direction direction);
    List<DirectionResponseDto> toResponseDto(List<Direction> directionList);

}
