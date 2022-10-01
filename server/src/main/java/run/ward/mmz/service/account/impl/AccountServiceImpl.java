package run.ward.mmz.service.account.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.account.Provider;
import run.ward.mmz.domain.account.Role;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.AccountRepository;
import run.ward.mmz.service.account.AccountService;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    @Transactional
    public Account signUp(Account account) {

        String rawPassword = account.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        account.registerUser(account, encPassword, Role.USER, Provider.LOCAL);
        return accountRepository.save(account);
    }

    @Override
    public void resign(Account account) {

        accountRepository.delete(account);
    }



    @Override
    public Account findById(Long id) {
        return findVerifiedEntity(id);
    }

    @Override
    public void verifyExistsId(Long id) {
        if (!accountRepository.existsById(id))
            throw new CustomException(ExceptionCode.USER_NOT_FOUND);
    }

    @Override
    public Account findVerifiedEntity(Long id) {

        return accountRepository.findById(id).orElseThrow(
                () -> new CustomException(ExceptionCode.USER_NOT_FOUND)
        );
    }
}
