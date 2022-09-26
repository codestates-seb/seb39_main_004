package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.dto.post.RecipeDto;
import run.ward.mmz.repository.RecipeRepository;
import run.ward.mmz.service.RecipeService;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;

    @Override
    public Page<Recipe> search(String body, Pageable pageable) {
        return null;
    }

    @Override
    @Transactional
    public Recipe save(RecipeDto.Request request) {

//        Recipe recipe = Recipe.createRecipe(
//                request.getTitle(),
//                request.getYoutubeUrl(),
//                request.getThumbNailImage(),
//                request.getPerTime(),
//                request.getStars(),
//                request.getOwner(),
//                request.getLevel(),
//                request.getIngredients(),
//                request.getDirections(),
//                request.getTags()
//        );
        return null;
//        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe findById(RecipeDto.Request request) {
        return null;
    }

    @Override
    @Transactional
    public void delete(Long id) {
        verifyExistsId(id);
        recipeRepository.deleteById(id);
    }

    @Override
    public Recipe update(Long id, RecipeDto.Request request) {



        return null;
    }

    @Override
    public void verifyExistsId(Long id) {
        if(recipeRepository.existsById(id)){
            // ToDo : throw null exception
        }
    }

    @Override
    public Recipe findVerifiedPost(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(
                        // () -> ToDo : throw null exception
                        );
    }
}
