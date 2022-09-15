package run.ward.mmz.mapper;

import run.ward.mmz.domain.image.entity.Image;
import run.ward.mmz.dto.FileDto;

import java.util.List;

public interface ImageMapper {
    List<Image> fileDtoListToImageList(List<FileDto> fileDtoList);
}
