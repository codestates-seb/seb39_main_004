package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.post.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}