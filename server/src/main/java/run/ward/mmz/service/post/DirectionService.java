package run.ward.mmz.service.post;

import org.springframework.web.multipart.MultipartFile;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.dto.common.FilesDto;
import run.ward.mmz.dto.request.post.DirectionPostDto;
import run.ward.mmz.service.common.RecipeElementService;

import java.util.List;

public interface DirectionService extends RecipeElementService<Direction> {

    void deleteByRecipeId(Long recipeId);
    List<Direction> saveAll(List<DirectionPostDto> directionPostDtoList, List<FilesDto> filesDtoList);
    List<Direction> updateAll(List<DirectionPostDto> directionPostDtoList, List<FilesDto> filesDtoList, Long recipeId);
}
