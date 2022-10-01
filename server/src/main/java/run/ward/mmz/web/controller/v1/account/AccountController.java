package run.ward.mmz.web.controller.v1.account;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.dto.common.ResponseDto;
import run.ward.mmz.dto.respones.AccountInfoDto;
import run.ward.mmz.mapper.account.AccountMapper;
import run.ward.mmz.service.account.AccountService;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final AccountMapper accountMapper;


    @GetMapping("/auth/signup/user-info")
    public ResponseEntity<?> changeUserInfoPage(
            @AuthenticationPrincipal Account user){

        AccountInfoDto accountInfoDto = accountMapper.toInfoDto(user);
        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(accountInfoDto)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/auth/signup/user-info/update")
    public ResponseEntity<?> changeUserInfo(
            @AuthenticationPrincipal Account user,
            @RequestBody AccountInfoDto accountInfoDto){



        return null;
    }

}
