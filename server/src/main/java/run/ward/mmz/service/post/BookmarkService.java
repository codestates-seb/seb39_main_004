package run.ward.mmz.service.post;

import org.springframework.data.domain.Page;
import run.ward.mmz.domain.post.Recipe;

import java.util.List;

public interface BookmarkService {

    boolean isBookmarkedByUser(Long recipeId, Long accountId);

    void setBookmarked(Long recipeId, Long accountId);
    void undoBookmarked(Long recipeId, Long accountId);
    Page<Recipe> findAllBookmarkedRecipeByUserId(int page, int size, Long userId, String orderBy, String sort);

}
