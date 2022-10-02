package run.ward.mmz.web.controller.v1.account;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.dto.auth.SessionUser;
import run.ward.mmz.dto.common.ResponseDto;
import run.ward.mmz.dto.respones.AccountInfoDto;
import run.ward.mmz.handler.auth.LoginUser;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.mapper.account.AccountMapper;
import run.ward.mmz.service.account.AccountService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final AccountMapper accountMapper;


    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/auth/signup/user-info")
    public ResponseEntity<?> updateUserInfoPage(
            @LoginUser Account user) {

        if (!user.isNew())
            throw new CustomException(ExceptionCode.USER_EXISTS);

        AccountInfoDto accountInfoDto = accountMapper.toInfoDto(user);
        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(accountInfoDto)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/auth/signup/user-info/update")
    public ResponseEntity<?> updateUserInfo(
            @LoginUser Account user,
            @RequestBody AccountInfoDto userInfoDto) {

        Account editUser = accountService.findById(userInfoDto.getId());

        if(!user.equals(editUser))
            throw new CustomException(ExceptionCode.USER_ACCESS_DENIED);

        editUser = accountService.update(user, userInfoDto);

        SessionUser sessionUser = SessionUser.builder()
                .user(editUser)
                .build();

        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(sessionUser)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
