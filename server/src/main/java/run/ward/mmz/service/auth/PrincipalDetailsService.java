package run.ward.mmz.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.dto.auth.PrincipalDetails;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.account.AccountRepository;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Account account = accountRepository.findByEmail(email).orElseThrow(
            () -> new CustomException(ExceptionCode.USER_NOT_FOUND)
        );

        return new PrincipalDetails(account);
    }
}
