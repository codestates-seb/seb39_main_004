package run.ward.mmz.web.controller.v1.account;

import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.dto.common.ResponseDto;
import run.ward.mmz.dto.request.account.SignUpDto;
import run.ward.mmz.dto.respones.AccountInfoDto;
import run.ward.mmz.handler.exception.ErrorResponse;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.mapper.account.AccountMapper;
import run.ward.mmz.service.account.AccountService;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


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

    @GetMapping("/auth/session-expired")
    public ResponseEntity<?> sessionExpired() {

        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("message", "세션이 만료되었습니다.");

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }


    @GetMapping("/auth/login-error")
    public ResponseEntity<?> loginError() {

        return new ResponseEntity<>(ErrorResponse.of(ExceptionCode.USER_NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @GetMapping("/auth/login-success")
    public ResponseEntity<?> loginSuccess(HttpServletRequest httpRequest) {

        AccountInfoDto accountInfoDto = accountMapper.toInfoDto((Account) httpRequest.getAttribute("user"));

        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(accountInfoDto)
                .build();

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

}
