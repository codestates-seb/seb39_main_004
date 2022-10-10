package run.ward.mmz.mapper.post.impl;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.dto.request.post.patch.DirectionPatchDto;
import run.ward.mmz.dto.request.post.DirectionPostDto;
import run.ward.mmz.dto.respones.DirectionResponseDto;
import run.ward.mmz.mapper.post.DirectionMapper;

import java.util.ArrayList;
import java.util.List;

@Component
public class DirectionMapperImpl implements DirectionMapper {


    @Override
    public Direction toEntity(DirectionPostDto directionPostDto, Files img) {

        if (directionPostDto == null)
            return null;

        if (img == null)
            return null;

        return Direction.builder()
                .index(directionPostDto.getIndex())
                .body(directionPostDto.getBody())
                .files(img)
                .build();
    }

    @Override
    public List<Direction> toEntity(List<DirectionPostDto> directionPostDtos, List<Files> imgs) {

        if (directionPostDtos.isEmpty())
            return new ArrayList<>();

        if (imgs.isEmpty())
            return new ArrayList<>();

        List<Direction> directions = new ArrayList<>();

        int idx = 0;

        for (DirectionPostDto directionPostDto : directionPostDtos) {
            directions.add(toEntity(directionPostDto, imgs.get(idx++)));
//            if(directionPostDto.isUploaded()){
//
//            }
        }

        return directions;
    }


    @Override
    public DirectionPatchDto toPatchDto(Direction direction) {

        if (direction == null) {
            return null;
        }

        return DirectionPatchDto.builder()
                .imgDirectionUrl(direction.getFiles().getFileName())
                .index(direction.getIdx())
                .body(direction.getBody())
                .build();
    }

    @Override
    public List<DirectionPatchDto> toPatchDto(List<Direction> directionList) {

        if(directionList.isEmpty()){
            return new ArrayList<>();
        }

        List<DirectionPatchDto> directionPatchDtoList = new ArrayList<>();

        for(Direction direction : directionList){
            directionPatchDtoList.add(toPatchDto(direction));
        }

        return directionPatchDtoList;
    }

    @Override
    public DirectionResponseDto toResponseDto(Direction direction) {

        if (direction == null) {
            return null;
        }

        return DirectionResponseDto.builder()
                .body(direction.getBody())
                .imgDirectionUrl(direction.getFiles().getFileName())
                .index(direction.getIdx())
                .build();

    }

    @Override
    public List<DirectionResponseDto> toResponseDto(List<Direction> directionList) {

        if (directionList.isEmpty()) {
            return new ArrayList<>();
        }

        List<DirectionResponseDto> directionResponseDtoList = new ArrayList<>();

        for (Direction direction : directionList) {
            directionResponseDtoList.add(toResponseDto(direction));
        }

        return directionResponseDtoList;
    }
}
