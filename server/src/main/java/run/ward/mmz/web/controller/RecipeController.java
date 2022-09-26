package run.ward.mmz.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.dto.account.AccountDto;
import run.ward.mmz.dto.post.RecipeDto;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RecipeController {

    @GetMapping("/recipe/{recipeId}")
    public ResponseEntity<?> readRecipe(@PathVariable Long recipeId, AccountDto user){

        return null;
    }

    @PostMapping("/recipe")
    public ResponseEntity<?> createNewRecipe(AccountDto user, @RequestBody RecipeDto.Request recipeDto) {

        return null;
    }

    @PatchMapping("/recipe/{recipeId}")
    public ResponseEntity<?> updateRecipe(@PathVariable Long recipeId, AccountDto user, @RequestBody RecipeDto.Request recipeDto) {

        return null;
    }

    @DeleteMapping("/recipe/{recipeId}")
    public ResponseEntity<?> deleteRecipe(@PathVariable Long recipeId, AccountDto user) {

        return null;
    }


}
