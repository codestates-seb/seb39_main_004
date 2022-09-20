package run.ward.mmz.mapper.image;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.image.Image;
import run.ward.mmz.dto.FileDto;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class ImageMapperImpl implements ImageMapper {

    @Override
    public List<Image> fileDtoListToImageList(List<FileDto> fileDtoList) {
        if (fileDtoList == null)
            return Collections.emptyList();

        List<Image> imageList = new ArrayList<>();
        for(FileDto fileDto : fileDtoList )
            imageList.add(fileDtoToImage(fileDto));

        return imageList;
    }

    protected Image fileDtoToImage(FileDto fileDto) {
        if (fileDto == null)
            return null;

        return Image.builder()
                .filePath(fileDto.getFilePath())
                .build();

    }
}
