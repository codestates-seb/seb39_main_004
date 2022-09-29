package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.DirectionRepository;
import run.ward.mmz.service.DirectionService;
import run.ward.mmz.service.ImageService;
import run.ward.mmz.service.RecipeService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DirectionServiceImpl implements DirectionService {

    private final DirectionRepository directionRepository;
    private final ImageService imageService;

    //Crud Service

    @Override
    public List<Direction> saveAll(List<Direction> directionList) {

        for(Direction direction : directionList){
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
        if(!directionRepository.existsById(id))
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

}
