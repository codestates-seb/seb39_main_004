package run.ward.mmz.mapper.post.impl;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.post.Tag;
import run.ward.mmz.dto.request.post.patch.TagPatchDto;
import run.ward.mmz.dto.request.post.TagPostDto;
import run.ward.mmz.dto.respones.TagResponseDto;
import run.ward.mmz.mapper.post.TagMapper;

import java.util.ArrayList;
import java.util.List;

@Component
public class TagMapperImpl implements TagMapper {

    @Override
    public Tag toEntity(TagPostDto tagPostDto) {

        if (tagPostDto == null) {
            return null;
        }

        return Tag.builder()
                .name(tagPostDto.getName())
                .build();
    }

    @Override
    public List<Tag> toEntity(List<TagPostDto> tagPostDtoList) {

        if(tagPostDtoList.isEmpty()){
            return new ArrayList<>();
        }

        List<Tag> tags = new ArrayList<>();

        for(TagPostDto tagPostDto : tagPostDtoList){
            tags.add(toEntity(tagPostDto));
        }

        return tags;
    }

    @Override
    public TagResponseDto toResponseDto(Tag tag) {

        if (tag == null) {
            return null;
        }

        return TagResponseDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .build();
    }

    @Override
    public List<TagResponseDto> toResponseDto(List<Tag> tagList) {

        if(tagList.isEmpty()){
            return new ArrayList<>();
        }

        List<TagResponseDto> tagResponseDtoList = new ArrayList<>();

        for (Tag tag : tagList) {
            tagResponseDtoList.add(toResponseDto(tag));
        }

        return tagResponseDtoList;
    }

    @Override
    public TagPatchDto toPatchDto(Tag tag) {

        if (tag == null) {
            return null;
        }

        return TagPatchDto.builder()
                .name(tag.getName())
                .build();
    }

    @Override
    public List<TagPatchDto> toPatchDto(List<Tag> tagList) {

        if (tagList.isEmpty()) {
            return new ArrayList<>();
        }

        List<TagPatchDto> tagPatchDtoList = new ArrayList<>();

        for (Tag tag : tagList) {
            tagPatchDtoList.add(toPatchDto(tag));
        }

        return tagPatchDtoList;
    }
}
