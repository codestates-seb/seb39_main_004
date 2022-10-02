package run.ward.mmz.web.controller.v1.post;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.service.post.BookmarkService;
import run.ward.mmz.handler.auth.LoginUser;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/recipe/{recipeId}/bookmark")
    public ResponseEntity<?> bookmarked(
            @LoginUser Account user,
            @PathVariable Long recipeId){

        bookmarkService.setBookmarked(recipeId, user.getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/recipe/{recipeId}/bookmark/undo")
    public ResponseEntity<?> undoBookmarked(
            @LoginUser Account user,
            @PathVariable Long recipeId){

        bookmarkService.undoBookmarked(recipeId, user.getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }



}
