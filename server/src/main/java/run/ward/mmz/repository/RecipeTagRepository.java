package run.ward.mmz.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.RecipeTag;

import java.util.List;

public interface RecipeTagRepository extends JpaRepository<RecipeTag, Long> {

    @Query("select r from RecipeTag r where r.tag.name = :name")
    List<RecipeTag> findAllByTagName(String name);

    @Query("select r from RecipeTag r where r.recipe.id = :id")
    List<RecipeTag> findAllByRecipeId(Long id);
}