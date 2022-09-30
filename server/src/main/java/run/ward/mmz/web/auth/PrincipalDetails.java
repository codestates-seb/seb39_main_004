package run.ward.mmz.web.auth;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import run.ward.mmz.domain.account.Account;

import java.util.ArrayList;
import java.util.Collection;

@Data
public class PrincipalDetails implements UserDetails {

    private Account user;

    public PrincipalDetails(Account account) {
        this.user = account;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collector = new ArrayList<>();
        collector.add(() -> {return user.getRole().getKey();});

        return null;

    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() { //계정 만료 여부
        return true;
    }

    @Override
    public boolean isAccountNonLocked() { //계정 잠금상태 확인
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() { //계정 비밀번호 일정 지나서 사용가능 여부
        return true;
    }

    @Override
    public boolean isEnabled() { //계정 활성화 여부
        return true;
    }
}
