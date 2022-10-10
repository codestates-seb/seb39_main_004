package run.ward.mmz.service.post.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.file.Image.ImageType;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.dto.common.FilesDto;
import run.ward.mmz.dto.request.post.DirectionPostDto;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.mapper.file.FilesMapper;
import run.ward.mmz.mapper.post.DirectionMapper;
import run.ward.mmz.repository.post.DirectionRepository;
import run.ward.mmz.repository.post.RecipeRepository;
import run.ward.mmz.service.post.DirectionService;
import run.ward.mmz.service.post.ImageService;
import run.ward.mmz.service.post.RecipeService;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DirectionServiceImpl implements DirectionService {

    private final DirectionRepository directionRepository;
    private final DirectionMapper directionMapper;
    private final ImageService imageService;
    private final FilesMapper filesMapper;


    //Crud Service

    @Override
    public List<Direction> saveAll(List<Direction> directionList) {

        for (Direction direction : directionList) {
            imageService.save(direction.getFiles());
        }

        return directionRepository.saveAll(directionList);
    }

    @Override
    @Transactional
    public Direction save(Direction direction) {
        return directionRepository.save(direction);
    }

    @Override
    @Transactional(readOnly = true)
    public Direction findById(Long id) {
        return directionRepository.getReferenceById(id);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        directionRepository.deleteById(id);
    }

    @Override
    public Direction update(Long id, Direction direction) {
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public void verifyExistsId(Long id) {
        if (!directionRepository.existsById(id))
            throw new CustomException(ExceptionCode.DIRECTION_NOT_FOUND);
    }

    @Override
    @Transactional(readOnly = true)
    public Direction findVerifiedEntity(Long id) {
        return directionRepository.findById(id).orElseThrow(
                () -> new CustomException(ExceptionCode.DIRECTION_NOT_FOUND)
        );
    }

    //Recipe Element Service

    @Override
    @Transactional
    public void deleteAll(List<Direction> directions) {
        directionRepository.deleteAll(directions);
    }

    @Override
    public List<Direction> findAllByRecipeId(Long recipeId) {
        return directionRepository.findAllByRecipeId(recipeId);
    }

    @Override
    @Transactional
    public void deleteByRecipeId(Long recipeId) {
        directionRepository.deleteAllByRecipeId(recipeId);
    }

    @Override
    @Transactional
    public List<Direction> saveAll(List<DirectionPostDto> directionPostDtoList, List<FilesDto> filesDtoList) {

        int idx = 0;
        List<Files> imgDirections = new ArrayList<>();

        for (DirectionPostDto directionPostDto : directionPostDtoList) {
            if (directionPostDto.isUploaded()) {
                imgDirections.add(directionPostDto.getIndex() - 1, filesMapper.fileDtoToImage(filesDtoList.get(idx++)));
            } else {
                imgDirections.add(directionPostDto.getIndex() - 1, imageService.findByName(directionPostDto.getImgDirectionUrl()));
            }
        }


        return directionMapper.toEntity(directionPostDtoList, imgDirections);
    }

    @Override
    public List<Direction> updateAll(List<DirectionPostDto> directionPostDtoList, List<FilesDto> filesDtoList, Long recipeId) {

        int idx = 0;
        List<Files> imgDirections = new ArrayList<>();

        for (DirectionPostDto directionPostDto : directionPostDtoList) {
            if (directionPostDto.isUploaded()) {
                imgDirections.add(directionPostDto.getIndex() - 1, filesMapper.fileDtoToImage(filesDtoList.get(idx++)));
            } else {
                imgDirections.add(directionPostDto.getIndex() - 1, imageService.findByName(directionPostDto.getImgDirectionUrl()));
            }
        }

        return directionMapper.toEntity(directionPostDtoList, imgDirections);
    }
}

