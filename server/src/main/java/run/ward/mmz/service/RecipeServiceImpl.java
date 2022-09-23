package run.ward.mmz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.dto.post.RecipeDto;
import run.ward.mmz.repository.RecipeRepository;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService{

    private final RecipeRepository recipeRepository;

    @Override
    public Page<Recipe> search(String body, Pageable pageable) {
        return null;
    }

    @Override
    @Transactional
    public Recipe save(RecipeDto.Request request) {
        
        return null;
    }

    @Override
    public Recipe findById(RecipeDto.Request request) {
        return null;
    }

    @Override
    @Transactional
    public void delete(Long id) {
        recipeRepository.deleteById(id);
    }

    @Override
    public Recipe update(Long id, RecipeDto.Request request) {
        return null;
    }

    @Override
    public void verifyExistsId(Long id) {

    }

    @Override
    public Recipe findVerifiedPost(Long id) {
        return null;
    }
}
