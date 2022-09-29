package run.ward.mmz.web.controller.v1;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1")
public class TestController {

    @PostMapping("/testpage")
    public ResponseEntity<?> testPage(
            HttpServletRequest httpServletRequest
    ) {

        return new ResponseEntity<>( httpServletRequest , HttpStatus.OK);
    }

}
