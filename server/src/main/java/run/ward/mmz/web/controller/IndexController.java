package run.ward.mmz.web.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.domain.post.TestRecipe;
import run.ward.mmz.dto.TestDto;
import run.ward.mmz.service.TestRecipeService;

import java.awt.print.Pageable;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class IndexController {

    private final TestRecipeService recipeService;

    @GetMapping("/test")
    public ResponseEntity<?> 테스트(){

        Map<String, String> testMap = new HashMap<>();
        testMap.put("테스트를", "진행합니다");

        return new ResponseEntity<>(testMap, HttpStatus.OK);
    }


    @PostMapping("/test")
    public ResponseEntity<?> post테스트(@RequestBody TestDto<?> testDto){

        return new ResponseEntity<>(testDto, HttpStatus.OK);
    }

    @PostMapping("/testRecipe/save")
    public ResponseEntity<?> testRecipe(@RequestBody TestRecipe testRecipe) {

        return new ResponseEntity<>(recipeService.save(testRecipe), HttpStatus.OK);
    }

    @GetMapping("/testRecipe")
    public ResponseEntity<?> testRecipe(String keyword){

        return new ResponseEntity<>(recipeService.page(keyword), HttpStatus.OK);
    }


    @GetMapping("/testRecipe2")
    public ResponseEntity<?> testRecipe(){

        return new ResponseEntity<>(recipeService.page(), HttpStatus.OK);
    }

}
