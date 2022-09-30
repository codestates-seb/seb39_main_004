package run.ward.mmz.mapper.post;

import run.ward.mmz.domain.post.Tag;

import run.ward.mmz.dto.request.post.patch.TagPatchDto;
import run.ward.mmz.dto.request.post.TagPostDto;
import run.ward.mmz.dto.respones.TagResponseDto;
import run.ward.mmz.mapper.post.common.RecipeElementMapper;

import java.util.List;


public interface TagMapper extends RecipeElementMapper<Tag, TagPostDto, TagResponseDto> {
    TagPatchDto toPatchDto(Tag tag);
    List<TagPatchDto> toPatchDto(List<Tag> tagList);
}
