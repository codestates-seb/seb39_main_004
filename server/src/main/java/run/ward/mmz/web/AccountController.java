package run.ward.mmz.web;


import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.dto.AccountDto;
import run.ward.mmz.dto.MultiResponseDto;
import run.ward.mmz.dto.SingleResponseDto;
import run.ward.mmz.mapper.AccountMapper;
import run.ward.mmz.service.AccountService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;


/**
 * - DI 적용
 * - Mapstruct Mapper 적용
 * - @ExceptionHandler 적용
 */
@RestController
@RequestMapping("/v11/members")
@Validated
@Slf4j
public class AccountController {
    private final AccountService accountService;
    private final AccountMapper mapper;

    public AccountController(AccountService accountService, AccountMapper mapper) {
        this.accountService = accountService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody AccountDto.Post requestBody) {
        Account account = mapper.accountPostToAccount(requestBody);

        Account createdAccount = accountService.createAccount(account);
        AccountDto.Response response = mapper.accountToAccountResponse(createdAccount);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive long id,
            @Valid @RequestBody AccountDto.Patch requestBody) {
        requestBody.setAccountId(id);

        Account account =
                accountService.updateAccount(mapper.accountPatchToAccount(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.accountToAccountResponse(account)),
                HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
            @PathVariable("member-id") @Positive long id) {
        Account account = accountService.findAccount(id);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.accountToAccountResponse(account))
                , HttpStatus.OK);
    }

    @GetMapping("/getmembers")
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Account> pageAccounts = accountService.findAccount(page - 1, size);
        List<Account> accounts = pageAccounts.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.accountsToAccountResponses(accounts),
                        pageAccounts),
                HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(
            @PathVariable("member-id") @Positive long id) {
        accountService.deleteAccount(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
