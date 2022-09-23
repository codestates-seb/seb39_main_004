package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.post.Bookmark;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

}