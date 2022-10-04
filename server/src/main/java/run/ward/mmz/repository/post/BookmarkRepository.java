package run.ward.mmz.repository.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Bookmark;
import run.ward.mmz.domain.post.Recipe;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query("select b from Bookmark b where b.user.id = :userId and b.recipe.id = :recipeId ")
    Boolean existsByUserIdAndRecipeId(Long userId, Long recipeId);
    boolean existsByUserAndRecipe(Account user, Recipe recipe);
    Bookmark findByUserAndRecipe(Account user, Recipe recipe);

    @Query("select b from Bookmark b where b.user.id = :userId")
    List<Bookmark> findAllByUserId(Long userId);

}