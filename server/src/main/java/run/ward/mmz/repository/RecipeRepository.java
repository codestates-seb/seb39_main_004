package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.post.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}