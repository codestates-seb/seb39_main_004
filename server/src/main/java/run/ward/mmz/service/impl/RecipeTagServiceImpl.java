package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.RecipeTag;
import run.ward.mmz.repository.RecipeTagRepository;
import run.ward.mmz.service.RecipeTagService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeTagServiceImpl implements RecipeTagService {

    private final RecipeTagRepository recipeTagRepository;
    @Override
    public List<RecipeTag> saveAll(List<RecipeTag> recipeTagList) {
        return recipeTagRepository.saveAll(recipeTagList);
    }

    @Override
    public RecipeTag save(RecipeTag recipeTag) {
        return recipeTagRepository.save(recipeTag);
    }

    @Override
    public RecipeTag findById(Long id) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public RecipeTag update(Long id, RecipeTag recipeTag) {
        return null;
    }

    @Override
    public void verifyExistsId(Long id) {

    }

    @Override
    public RecipeTag findVerifiedEntity(Long id) {
        return null;
    }

    @Override
    public RecipeTag findByRecipeId(Long recipeId) {
        return null;
    }

    @Override
    public List<RecipeTag> findAllByRecipeId(Long recipeId) {
        return null;
    }

    @Override
    public void verifyExistsRecipeId(Long recipeId) {

    }
}
