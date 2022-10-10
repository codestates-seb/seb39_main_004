package run.ward.mmz.web.controller.v1.auth;

import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.dto.auth.SessionUser;
import run.ward.mmz.dto.common.ResponseDto;
import run.ward.mmz.dto.request.account.SignUpDto;
import run.ward.mmz.dto.respones.AccountInfoDto;
import run.ward.mmz.handler.auth.LoginUser;
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
        user = accountService.signUp(user);

        AccountInfoDto accountInfoDto = accountMapper.toInfoDto(user);

        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(accountInfoDto)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("/auth/resign")
    public ResponseEntity<?> resign(
            @LoginUser Account user) {

        accountService.resign(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/auth/session-expired")
    public ResponseEntity<?> sessionExpired() {

        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("message", "세션이 만료되었습니다.");

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    @GetMapping("/auth/session-status")
    public ResponseEntity<?> sessionStatus(
            @LoginUser Account user) {

        SessionUser sessionUser = SessionUser.builder()
                .user(user)
                .build();

        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(sessionUser)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/auth/login-success")
    public ResponseEntity<?> loginSuccess(
            @LoginUser Account user) {

        user.setNew(false);
        accountService.save(user);

        SessionUser sessionUser = SessionUser.builder()
                .user(user)
                .build();

        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(sessionUser)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
