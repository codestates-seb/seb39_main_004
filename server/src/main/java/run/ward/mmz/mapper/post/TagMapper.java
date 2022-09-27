package run.ward.mmz.mapper.post;

import run.ward.mmz.domain.post.Tag;

import run.ward.mmz.dto.request.TagPostDto;
import run.ward.mmz.dto.respones.TagResponseDto;
import run.ward.mmz.mapper.post.common.RecipeElementMapper;


public interface TagMapper extends RecipeElementMapper<Tag, TagPostDto, TagResponseDto> {

}
