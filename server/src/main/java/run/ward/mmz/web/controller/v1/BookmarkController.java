package run.ward.mmz.web.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Bookmark;
import run.ward.mmz.service.BookmarkService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class BookmarkController {

    private final BookmarkService bookmarkService;
    @PostMapping("/recipe/{recipeId}/bookmark")
    public ResponseEntity<?> bookmarked(
            Account account,
            @PathVariable Long recipeId){

        bookmarkService.setBookmarked(recipeId, 1L);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/recipe/{recipeId}/bookmark/undo")
    public ResponseEntity<?> undoBookmarked(
            Account account,
            @PathVariable Long recipeId){

        bookmarkService.undoBookmarked(recipeId, 1L);

        return new ResponseEntity<>(HttpStatus.OK);
    }



}
