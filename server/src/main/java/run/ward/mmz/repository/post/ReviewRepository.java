package run.ward.mmz.repository.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import run.ward.mmz.domain.post.Review;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("select r from Review r where r.recipe.id = :id")
    List<Review> findAllByRecipeId(Long id);

    @Query("select r from Review r where r.recipe.id = :id")
    Page<Review> findAllByRecipeId(Long id, Pageable pageable);

    @Query("select r from Review r where r.owner.id = :id")
    Page<Review> findAllByOwnerId(Long id, Pageable pageable);
}