package run.ward.mmz.repository.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.Review;

import java.util.List;
import java.util.Set;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Page<Recipe> findAllByCategory(String name, Pageable pageable);
    Set<Recipe> findAllByTitleContaining(String title);
    @Query("select r from Recipe r where r.owner.id = :id")
    Page<Recipe> findAllByOwnerId(Long id, Pageable pageable);

}