package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.repository.AccountRepository;
import run.ward.mmz.repository.BookmarkRepository;
import run.ward.mmz.repository.RecipeRepository;
import run.ward.mmz.service.AccountService;
import run.ward.mmz.service.BookmarkService;
import run.ward.mmz.service.RecipeService;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final RecipeService recipeService;
    private final AccountService accountService;

    @Override
    public void setBookmarked(Long recipeId, Long accountId) {

        Recipe recipe = recipeService.findById(recipeId);
        Account account = accountService.findById(accountId);



    }

    @Override
    public void undoBookmarked(Long recipeId, Long accountId) {

    }

    @Override
    public Page<Recipe> findAllByAccountId(int page, int size, Long accountId, String orderBy) {
        return null;
    }
}
