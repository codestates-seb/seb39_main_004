package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import run.ward.mmz.domain.post.Tag;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Tag getReferenceByName(String name);
    Tag findByName(String name);
}