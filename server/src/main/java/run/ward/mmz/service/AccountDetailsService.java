package run.ward.mmz.service;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.handler.exception.BusinessLogicException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.AccountRepository;
import run.ward.mmz.web.config.CustomAuthorityUtils;

import java.util.Collection;
import java.util.Optional;


@Component
public class AccountDetailsService implements UserDetailsService {
    private final AccountRepository accountRepository;
    private final CustomAuthorityUtils authorityUtils;

    public AccountDetailsService(AccountRepository accountRepository, CustomAuthorityUtils authorityUtils) {
        this.accountRepository = accountRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> optionalMember = accountRepository.findByEmail(username);
        Account findAccount = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new AccountDetails(findAccount);
    }

    private final class AccountDetails extends Account implements UserDetails {
        // (1)
        AccountDetails(Account account) {
            setId(account.getId());
            setEmail(account.getEmail());
            setPassword(account.getPassword());
            setRoles(account.getRoles());
        }



        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }


    }
}