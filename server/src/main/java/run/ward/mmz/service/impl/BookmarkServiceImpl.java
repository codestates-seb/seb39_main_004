package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Bookmark;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.AccountRepository;
import run.ward.mmz.repository.BookmarkRepository;
import run.ward.mmz.repository.RecipeRepository;
import run.ward.mmz.service.AccountService;
import run.ward.mmz.service.BookmarkService;
import run.ward.mmz.service.RecipeService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final RecipeService recipeService;
    private final AccountService accountService;

    @Override
    @Transactional
    public void setBookmarked(Long recipeId, Long accountId) {

        Recipe recipe = recipeService.findById(recipeId);
        Account account = accountService.findById(accountId);

        if(!recipe.getOwner().getId().equals(accountId))
            throw new CustomException(ExceptionCode.USER_ACCESS_DENIED);

        Bookmark bookmark = Bookmark.builder().build();
        bookmark.setBookmarked(recipe, account);
        bookmarkRepository.save(bookmark);

    }

    @Override
    @Transactional
    public void undoBookmarked(Long recipeId, Long accountId) {

        Recipe recipe = recipeService.findById(recipeId);
        Account account = accountService.findById(accountId);

        if(!recipe.getOwner().getId().equals(accountId))
            throw new CustomException(ExceptionCode.USER_ACCESS_DENIED);

        Bookmark bookmark = Bookmark.builder().build();
        bookmark.removeBookmarked(recipe, account);
        bookmarkRepository.delete(bookmark);

    }

    @Override
    @Transactional(readOnly = true)
    public Page<Recipe> findAllByAccountId(int page, int size, Long accountId, String orderBy, String sort) {

        Sort bySort = Sort.by(orderBy).descending();

        if (!sort.equals("dec"))
            bySort = bySort.ascending();

        List<Recipe> recipeList = accountService.findById(accountId).getRecipeList();

        return new PageImpl<>(
                recipeList,
                PageRequest.of(page - 1, size, bySort),
                recipeList.size()
        );
    }
}
