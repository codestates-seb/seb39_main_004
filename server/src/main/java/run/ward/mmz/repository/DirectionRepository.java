package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.post.Direction;

public interface DirectionRepository extends JpaRepository<Direction, Long> {
}