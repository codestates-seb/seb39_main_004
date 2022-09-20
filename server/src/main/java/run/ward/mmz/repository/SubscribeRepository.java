package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.subscribe.Subscribe;

public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {
}