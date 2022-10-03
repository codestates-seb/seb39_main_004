package run.ward.mmz.service.post.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.repository.account.AccountRepository;

@Service
@RequiredArgsConstructor
public class TestAccountService {
    private final AccountRepository accountRepository;

    @Transactional
    public Account save(Account account) {

        return accountRepository.save(account);
    }
}
