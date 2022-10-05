package run.ward.mmz.web.controller.v1.account;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.subscribe.Subscribe;
import run.ward.mmz.dto.common.ResponseDto;
import run.ward.mmz.dto.respones.AccountInfoDto;
import run.ward.mmz.handler.auth.LoginUser;
import run.ward.mmz.mapper.account.AccountMapper;
import run.ward.mmz.service.account.AccountService;
import run.ward.mmz.service.account.SubscribeService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SubscribeController {

    private final SubscribeService subscribeService;
    private final AccountMapper accountMapper;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/follow/{followId}")
    public ResponseEntity<?> followUser(
            @PathVariable Long followId,
            @LoginUser Account user) {

        subscribeService.follow(followId, user.getId());
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/follow/undo/{followId}")
    public ResponseEntity<?> unFollowUser(
            @PathVariable Long followId,
            @LoginUser Account user) {

        subscribeService.unFollow(followId, user.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/user/{userId}/follow-list")
    public ResponseEntity<?> myFollowList(
            @PathVariable Long userId) {

        List<Account> followList = subscribeService.findAllFollowUserByAccount(userId);
        List<AccountInfoDto> userInfoList = accountMapper.toInfoDto(followList);
        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(userInfoList)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/user/{userId}/following-list")
    public ResponseEntity<?> myFollowingList(
            @PathVariable Long userId) {

        List<Account> followingList = subscribeService.findAllFollowingUserByAccount(userId);
        List<AccountInfoDto> userInfoList = accountMapper.toInfoDto(followingList);
        ResponseDto.Single<?> response = ResponseDto.Single.builder()
                .data(userInfoList)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
