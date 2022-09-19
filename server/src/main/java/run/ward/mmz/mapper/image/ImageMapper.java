package run.ward.mmz.mapper.image;

import run.ward.mmz.domain.image.Image;
import run.ward.mmz.dto.FileDto;

import java.util.List;

public interface ImageMapper {
    List<Image> fileDtoListToImageList(List<FileDto> fileDtoList);
}
