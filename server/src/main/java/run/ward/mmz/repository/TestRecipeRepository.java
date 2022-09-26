package run.ward.mmz.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import run.ward.mmz.domain.post.TestRecipe;

import javax.persistence.Entity;
import java.time.LocalDateTime;

public interface TestRecipeRepository extends JpaRepository<TestRecipe, Long> {

    Slice<TestRecipe> findByTitleContaining(String keyword);
}