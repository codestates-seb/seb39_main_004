package run.ward.mmz.dto.auth;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import run.ward.mmz.domain.account.Account;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Data
public class PrincipalDetails implements UserDetails, OAuth2User {

    private Account user;
    private Map<String, Object> attributes;

    public PrincipalDetails(Account account, Map<String, Object> attributes) {
        this.user = account;
        this.attributes = attributes;
    }

    public PrincipalDetails(Account account) {
        this.user = account;
    }

    @Override
    public String getName() {
        return (String)attributes.get("email");
    }


    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collector = new ArrayList<>();
        collector.add(() -> user.getRole().getKey());

        return collector;
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
