package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.post.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}