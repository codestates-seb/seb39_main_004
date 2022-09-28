package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.domain.post.Ingredient;

import java.util.List;

public interface DirectionRepository extends JpaRepository<Direction, Long> {
    @Query("select d from Direction d where d.recipe.id = :id order by d.id desc")
    List<Direction> findAllByRecipeId(@Param("id") Long id);
}