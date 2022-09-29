package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Bookmark;
import run.ward.mmz.domain.post.Recipe;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    boolean existsByOwnerAndRecipe(Account owner, Recipe recipe);
    Bookmark findByOwnerAndRecipe(Account owner, Recipe recipe);
}