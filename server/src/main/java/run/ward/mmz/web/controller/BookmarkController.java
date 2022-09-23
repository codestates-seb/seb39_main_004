package run.ward.mmz.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.dto.account.AccountDto;


@RestController
@RequestMapping("/api`")
@RequiredArgsConstructor
public class BookmarkController {


    @PostMapping("/bookmark/{recipeId}")
    public ResponseEntity<?> bookmarkRecipe(@PathVariable Long recipeId, AccountDto user) {

        return null;
    }

    @PostMapping("/bookmark/{recipeId}/undo")
    public ResponseEntity<?> bookmarkUndoRecipe(@PathVariable Long recipeId, AccountDto user) {

        return null;
    }

    @GetMapping("/user/{userId}/bookmark")
    public ResponseEntity<?> viewAllBookmarkByUser(@PathVariable Long userId){

        return null;
    }

}
