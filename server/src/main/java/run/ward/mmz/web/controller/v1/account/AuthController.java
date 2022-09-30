package run.ward.mmz.web.controller.v1.account;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.dto.request.account.SignUpDto;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ErrorResponse;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.mapper.account.AccountMapper;
import run.ward.mmz.service.account.AccountService;


@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthController {

    private final AccountService accountService;
    private final AccountMapper accountMapper;

    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(
            @RequestBody SignUpDto signUpDto) {

        Account user = accountMapper.toEntity(signUpDto);
        accountService.signUp(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/auth/login-page")
    public ResponseEntity<?> loginPage(){

        return new ResponseEntity<>(HttpStatus.OK);
    }



    @GetMapping("/auth/login-error")
    public ResponseEntity<?> loginError(){

        return new ResponseEntity<>(ErrorResponse.of(ExceptionCode.USER_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

}
