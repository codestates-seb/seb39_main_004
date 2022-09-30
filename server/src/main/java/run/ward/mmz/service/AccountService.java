package run.ward.mmz.service;


import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.handler.exception.BusinessLogicException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.AccountRepository;
import run.ward.mmz.web.config.AccountRegistrationApplicationEvent;
import run.ward.mmz.web.config.CustomAuthorityUtils;

import java.util.List;
import java.util.Optional;

/**
 *  - 메서드 구현
 *  - DI 적용
 *  - Spring Data JPA 적용
 *  - 트랜잭션 적용
 */
@Transactional
@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final ApplicationEventPublisher publisher;

    // 추가
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public AccountService(AccountRepository accountRepository,
                         ApplicationEventPublisher publisher,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils) {
        this.accountRepository = accountRepository;
        this.publisher = publisher;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public Account createAccount(Account account) {
        verifyExistsEmail(account.getEmail());

        // 추가: Password 암호화
        String encryptedPassword = passwordEncoder.encode(account.getPassword());
        account.setPassword(encryptedPassword);

        // 추가: DB에 User Role 저장
        List<String> roles = authorityUtils.createRoles(account.getEmail());
        account.setRoles(roles);
        Account savedAccount = accountRepository.save(account);


        publisher.publishEvent(new AccountRegistrationApplicationEvent(savedAccount));
        return savedAccount;
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Account updateAccount(Account account) {
        Account findAccount = findVerifiedAccount(account.getId());

        Optional.ofNullable(account.getNickname())
                .ifPresent(nickname -> findAccount.setNickname(nickname));

        return accountRepository.save(findAccount);
    }

    @Transactional(readOnly = true)
    public Account findAccount(long id) {
        return findVerifiedAccount(id);
    }

    public Page<Account> findAccount(int page, int size) {
        return accountRepository.findAll(PageRequest.of(page, size,
                Sort.by("Id").descending()));
    }

    public void deleteAccount(long id) {
        Account findAccount = findVerifiedAccount(id);

        accountRepository.delete(findAccount);
    }

    @Transactional(readOnly = true)
    public Account findVerifiedAccount(long id) {
        Optional<Account> optionalAccount =
                accountRepository.findById(id);
        Account findAccount =
                optionalAccount.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findAccount;
    }

    private void verifyExistsEmail(String email) {
        Optional<Account> account = accountRepository.findByEmail(email);
        if (account.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
}