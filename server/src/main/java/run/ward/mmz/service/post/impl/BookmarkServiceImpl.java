package run.ward.mmz.service.post.impl;

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
import run.ward.mmz.repository.post.BookmarkRepository;
import run.ward.mmz.service.account.AccountService;
import run.ward.mmz.service.post.BookmarkService;
import run.ward.mmz.service.post.RecipeService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final RecipeService recipeService;
    private final AccountService accountService;

    @Override
    @Transactional(readOnly = true)
    public boolean isBookmarkedByUser(Long recipeId, Long accountId){

        Recipe recipe = recipeService.findById(recipeId);
        Account account = accountService.findById(accountId);

        return bookmarkRepository.existsByOwnerAndRecipe(account, recipe);
    }

    @Override
    @Transactional
    public void setBookmarked(Long recipeId, Long accountId) {

        Recipe recipe = recipeService.findById(recipeId);
        Account account = accountService.findById(accountId);

        if(!recipe.getOwner().getId().equals(accountId))
            throw new CustomException(ExceptionCode.USER_ACCESS_DENIED);

        Bookmark bookmark = Bookmark.builder().build();

        if(bookmarkRepository.existsByOwnerAndRecipe(account, recipe)) {
            throw new CustomException(ExceptionCode.BOOKMARK_EXISTS);
        }
        else{
            bookmark.setBookmarked(recipe, account);
            bookmarkRepository.save(bookmark);
        }

    }

    @Override
    @Transactional
    public void undoBookmarked(Long recipeId, Long accountId) {

        Recipe recipe = recipeService.findById(recipeId);
        Account account = accountService.findById(accountId);

        if(!recipe.getOwner().getId().equals(accountId))
            throw new CustomException(ExceptionCode.USER_ACCESS_DENIED);

        Bookmark bookmark = bookmarkRepository.findByOwnerAndRecipe(account, recipe);

        if(bookmarkRepository.existsByOwnerAndRecipe(account, recipe)) {
            bookmark.removeBookmarked(recipe, account);
            bookmarkRepository.delete(bookmark);
        }
        else{
            throw new CustomException(ExceptionCode.BOOKMARK_NOT_FOUND);
        }

    }

    @Override
    @Transactional(readOnly = true)
    public Page<Recipe> findAllBookmarkedRecipeByAccountId(int page, int size, Long accountId, String orderBy, String sort) {

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
