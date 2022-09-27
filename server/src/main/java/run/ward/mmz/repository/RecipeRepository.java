package run.ward.mmz.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.domain.post.Recipe;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Page<Recipe> findAllByCategory(String name, Pageable pageable);

}