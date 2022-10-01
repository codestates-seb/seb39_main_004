package run.ward.mmz.mapper.post;


import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.dto.request.post.patch.DirectionPatchDto;
import run.ward.mmz.dto.request.post.DirectionPostDto;
import run.ward.mmz.dto.respones.DirectionResponseDto;

import java.util.List;

public interface DirectionMapper{
    Direction toEntity(DirectionPostDto dto, Files img);
    List<Direction> toEntity(List<DirectionPostDto> dtoList, List<Files> imgList);
    DirectionPatchDto toPatchDto(Direction direction);
    List<DirectionPatchDto> toPatchDto(List<Direction> directionList);

    DirectionResponseDto toResponseDto(Direction direction);
    List<DirectionResponseDto> toResponseDto(List<Direction> directionList);

}
