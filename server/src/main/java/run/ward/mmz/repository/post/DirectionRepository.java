package run.ward.mmz.repository.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.domain.post.Ingredient;

import java.util.List;

public interface DirectionRepository extends JpaRepository<Direction, Long> {
    @Query("select d from Direction d where d.recipe.id = :id order by d.id desc")
    List<Direction> findAllByRecipeId(@Param("id") Long id);

    @Modifying
    @Query(value = "delete all from Direction d where recipeId  =:recipeId", nativeQuery = true)
    void deleteAllByRecipeId(Long recipeId);


}