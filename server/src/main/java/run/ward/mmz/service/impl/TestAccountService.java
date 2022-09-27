package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.repository.AccountRepository;

@Service
@RequiredArgsConstructor
public class TestAccountService {
    private final AccountRepository accountRepository;

    public Account save(Account account) {

        return accountRepository.save(account);
    }
}
