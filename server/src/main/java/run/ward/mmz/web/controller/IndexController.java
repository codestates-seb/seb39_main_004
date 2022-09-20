package run.ward.mmz.web.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.dto.TestDto;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class IndexController {

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

}
