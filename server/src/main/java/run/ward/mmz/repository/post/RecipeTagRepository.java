package run.ward.mmz.repository.post;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import run.ward.mmz.domain.post.RecipeTag;

public interface RecipeTagRepository extends JpaRepository<RecipeTag, Long> {

    @Query("select r from RecipeTag r where r.recipe.id = :id")
    void deleteAllByRecipeId(@Param("id")Long id);
}