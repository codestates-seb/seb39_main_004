package run.ward.mmz.repository.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Bookmark;
import run.ward.mmz.domain.post.Recipe;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query("select b from Bookmark b where b.owner.id = :ownerId and b.recipe.id = :recipeId ")
    boolean existsByOwnerIdAndRecipeId(Long ownerId, Long recipeId);
    boolean existsByOwnerAndRecipe(Account owner, Recipe recipe);
    Bookmark findByOwnerAndRecipe(Account owner, Recipe recipe);
}