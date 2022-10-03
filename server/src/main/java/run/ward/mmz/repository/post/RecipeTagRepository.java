package run.ward.mmz.repository.post;


import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.post.RecipeTag;

public interface RecipeTagRepository extends JpaRepository<RecipeTag, Long> {

}