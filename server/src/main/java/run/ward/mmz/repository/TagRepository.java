package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.post.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
}