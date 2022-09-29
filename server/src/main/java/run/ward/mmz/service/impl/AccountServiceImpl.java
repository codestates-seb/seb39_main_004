package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.AccountRepository;
import run.ward.mmz.service.AccountService;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

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
