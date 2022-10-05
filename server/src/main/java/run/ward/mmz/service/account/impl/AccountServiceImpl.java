package run.ward.mmz.service.account.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.account.Provider;
import run.ward.mmz.domain.account.Role;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.dto.respones.AccountInfoDto;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.account.AccountRepository;
import run.ward.mmz.service.account.AccountService;


@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    String defaultProfileUrl = "default_thumbnail.png";

    @Override
    public Account save(Account user) {
        return accountRepository.save(user);
    }

    @Override
    @Transactional
    public Account signUp(Account user) {

        if (accountRepository.existsByEmail(user.getEmail()))
            throw new CustomException(ExceptionCode.USER_EXISTS);

        if (accountRepository.existsByName(user.getName()))
            throw new CustomException(ExceptionCode.USER_EXISTS);

        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.registerUser(user, defaultProfileUrl, false, encPassword, Role.USER, Provider.LOCAL.getValue());

        return accountRepository.save(user);
    }

    @Override
    @Transactional
    public void resign(Account user) {

        accountRepository.delete(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Account findById(Long id) {
        return findVerifiedEntity(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Account findByEmail(String email) {
        return accountRepository.findByEmail(email).orElseThrow(
                () -> new CustomException(ExceptionCode.USER_NOT_FOUND)
        );
    }


    @Override
    @Transactional(readOnly = true)
    public void verifyExistsId(Long id) {
        if (!accountRepository.existsById(id))
            throw new CustomException(ExceptionCode.USER_NOT_FOUND);
    }

    @Override
    @Transactional(readOnly = true)
    public Account findVerifiedEntity(Long id) {

        return accountRepository.findById(id).orElseThrow(
                () -> new CustomException(ExceptionCode.USER_NOT_FOUND)
        );
    }

    @Override
    @Transactional
    public Account update(Account user, AccountInfoDto userInfoDto) {

        if (!accountRepository.existsByEmail(user.getEmail()))
            throw new CustomException(ExceptionCode.USER_NOT_FOUND);

        if (!accountRepository.existsByName(user.getName()))
            throw new CustomException(ExceptionCode.USER_NOT_FOUND);

        return user.updateInfo(userInfoDto);
    }

    @Override
    @Transactional
    public Account updateImgProfile(Long id, Files imgProfile) {
        Account user = findVerifiedEntity(id);
        return user.updateImgProfile(imgProfile);
    }


}
