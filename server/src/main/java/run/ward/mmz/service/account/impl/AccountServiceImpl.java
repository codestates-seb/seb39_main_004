package run.ward.mmz.service.account.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.account.Provider;
import run.ward.mmz.domain.account.Role;
import run.ward.mmz.dto.respones.AccountInfoDto;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.AccountRepository;
import run.ward.mmz.service.account.AccountService;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${default.img.path}")
    String defaultProfileUrl;

    @Override
    @Transactional
    public Account signUp(Account user) {

        if (!accountRepository.existsByEmail(user.getName()))
            throw new CustomException(ExceptionCode.USER_EXISTS);

        if (!accountRepository.existsByName(user.getName()))
            throw new CustomException(ExceptionCode.USER_EXISTS);

        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.registerUser(user, defaultProfileUrl, false, encPassword, Role.USER, Provider.LOCAL.getValue());
        return accountRepository.save(user);
    }

    @Override
    public void resign(Account user) {

        accountRepository.delete(user);
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

    @Override
    public Account update(Account user, AccountInfoDto userInfoDto) {

        if (!accountRepository.existsByEmail(user.getName()))
            throw new CustomException(ExceptionCode.USER_EXISTS);

        if (!accountRepository.existsByName(user.getName()))
            throw new CustomException(ExceptionCode.USER_EXISTS);

        return user.updateInfo(userInfoDto);
    }


}
