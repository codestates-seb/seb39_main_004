package run.ward.mmz.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.dto.auth.OAuthAttributes;
import run.ward.mmz.dto.auth.PrincipalDetails;
import run.ward.mmz.dto.auth.SessionUser;
import run.ward.mmz.mapper.account.AccountMapper;
import run.ward.mmz.repository.account.AccountRepository;

import javax.servlet.http.HttpSession;

@Service
@RequiredArgsConstructor
public class OAuth2UserService implements org.springframework.security.oauth2.client.userinfo.OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        org.springframework.security.oauth2.client.userinfo.OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String regId = userRequest.getClientRegistration().getRegistrationId();
        String attributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(regId, attributeName, oAuth2User.getAttributes());
        Account user = save(attributes);
        return new PrincipalDetails(user, attributes.getAttributes());
    }


    @Transactional
    public Account save(OAuthAttributes attributes) {

        String userName = attributes.getName() != null ? attributes.getName() : "유저";
        String userEmail = attributes.getEmail() != null ? attributes.getEmail() : "";
        //유저 이름이 있으면, 이름 변경, 없으면 회원가입
        String tmp = userName;

        if (!accountRepository.existsByEmail(userEmail)) {
            while (accountRepository.existsByName(tmp)) {
                tmp = tmp + ((int) (Math.random() * 990) + 10);
            }
        }else{
            tmp = accountRepository.findByEmail(userEmail)
                    .orElseThrow()
                    .getName();
        }

        attributes.setNew(false);
        String finalUserName = tmp;

        Account account = accountRepository.findByEmail(attributes.getEmail())
                .orElse(accountMapper.toEntity(attributes));

        return accountRepository.save(account.updateName(finalUserName));

    }

}
