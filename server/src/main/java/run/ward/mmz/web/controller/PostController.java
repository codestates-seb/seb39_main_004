package run.ward.mmz.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.dto.account.AccountDto;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostController {

    @GetMapping("/recipe/{id}")
    public ResponseEntity<?> read(@PathVariable Long id, AccountDto user){

        return null;
    }



}
