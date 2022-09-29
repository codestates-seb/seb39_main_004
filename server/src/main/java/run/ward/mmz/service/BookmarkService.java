package run.ward.mmz.service;

import org.springframework.data.domain.Page;
import run.ward.mmz.domain.post.Recipe;

import java.util.List;

public interface BookmarkService {

    void setBookmarked(Long recipeId, Long accountId);
    void undoBookmarked(Long recipeId, Long accountId);
    Page<Recipe> findAllByAccountId(int page, int size, Long accountId, String orderBy);

}
