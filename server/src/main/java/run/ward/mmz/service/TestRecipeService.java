package run.ward.mmz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.post.TestRecipe;
import run.ward.mmz.repository.TestRecipeRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestRecipeService {

    private final TestRecipeRepository testRecipeRepository;

    @Transactional
    public TestRecipe save(TestRecipe testRecipe){

        return testRecipeRepository.save(testRecipe);
    }

    @Transactional(readOnly = true)
    public Slice<TestRecipe> page(String keyword) {
        return testRecipeRepository.findByTitleContaining(keyword);
    }


    @Transactional(readOnly = true)
    public List<TestRecipe> page() {
        return testRecipeRepository.findAll();
    }



}
