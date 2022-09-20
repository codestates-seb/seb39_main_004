package run.ward.mmz.mapper.image;

import run.ward.mmz.domain.file.File;
import run.ward.mmz.dto.FileDto;

import java.util.List;

public interface ImageMapper {
    List<File> fileDtoListToImageList(List<FileDto> fileDtoList);
}
