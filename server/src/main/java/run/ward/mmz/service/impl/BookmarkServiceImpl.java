package run.ward.mmz.service.impl;

import org.springframework.data.domain.Page;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.service.BookmarkService;

public class BookmarkServiceImpl implements BookmarkService {

    @Override
    public void setBookmarked(Long recipeId, Long accountId) {

    }

    @Override
    public void undoBookmarked(Long recipeId, Long accountId) {

    }

    @Override
    public Page<Recipe> findAllByAccountId(int page, int size, Long accountId, String orderBy) {
        return null;
    }
}
