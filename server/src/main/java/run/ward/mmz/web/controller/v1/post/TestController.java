package run.ward.mmz.web.controller.v1.post;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1")
public class TestController {

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/testpage")
    public ResponseEntity<?> testPage(
            HttpServletRequest httpServletRequest
    ) {
        System.out.println("httpServletRequest = " + 123);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
