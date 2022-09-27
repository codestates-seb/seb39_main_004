package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.repository.DirectionRepository;
import run.ward.mmz.service.DirectionService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DirectionServiceImpl implements DirectionService {

    private final DirectionRepository directionRepository;

    //Crud Service

    @Override
    @Transactional
    public List<Direction> saveAll(List<Direction> directionList) {
        return directionRepository.saveAll(directionList);
    }

    @Override
    @Transactional
    public Direction save(Direction direction) {
        return directionRepository.save(direction);
    }

    @Override
    public Direction findById(Long id) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public Direction update(Long id, Direction direction) {
        return null;
    }

    @Override
    public void verifyExistsId(Long id) {

    }

    @Override
    public Direction findVerifiedEntity(Long id) {
        return null;
    }

    //Recipe Element Service

    @Override
    public Direction findByRecipeId(Long recipeId) {
        return null;
    }

    @Override
    public List<Direction> findAllByRecipeId(Long recipeId) {
        return null;
    }

    @Override
    public void verifyExistsRecipeId(Long recipeId) {

    }
}
