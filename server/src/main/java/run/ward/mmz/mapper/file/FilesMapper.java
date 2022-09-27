package run.ward.mmz.mapper.file;

import run.ward.mmz.domain.file.Files;
import run.ward.mmz.dto.common.FilesDto;

import java.util.List;

public interface FilesMapper {
    List<Files> fileDtoListToImageList(List<FilesDto> filesDtoList);
    Files fileDtoToImage(FilesDto filesDto);
}
