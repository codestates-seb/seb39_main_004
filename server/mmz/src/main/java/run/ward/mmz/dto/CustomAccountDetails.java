package run.ward.mmz.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import run.ward.mmz.domain.account.Account;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class CustomAccountDetails implements UserDetails, OAuth2User {

    private Long id;
    private String email;

    private String name;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public CustomAccountDetails(Long id, String email, String name, Collection<? extends GrantedAuthority> authorities){
        this.id = id;
        this.email = email;
        this.name = name;
        this.authorities = authorities;
    }

    public static CustomAccountDetails create(Account account){
        List<GrantedAuthority> authorities = Collections
                .singletonList(new SimpleGrantedAuthority("ROLE_USER"));

        return new CustomAccountDetails(
                account.getId(),
                account.getEmail(),
                account.getName(),
                authorities
        );
    }

    public static CustomAccountDetails create(Account account, Map<String, Object> attributes){
        CustomAccountDetails accountDetails = CustomAccountDetails.create(account);
        accountDetails.setAttributes(attributes);
        return accountDetails;
    }

    @Override
    public String getName() {
        return String.valueOf(id);
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }



    @Override
    public String getUsername() {
        return email;
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
