package run.ward.mmz.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
import run.ward.mmz.repository.AccountRepository;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserService implements org.springframework.security.oauth2.client.userinfo.OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final AccountRepository accountRepository;
    private final HttpSession httpSession;
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
        httpSession.setAttribute("user", new SessionUser(user));
        return new PrincipalDetails(user, attributes.getAttributes());
    }


    @Transactional
    public Account save(OAuthAttributes attributes) {

        String userName = attributes.getName();
        long tail = 1;
        //유저 이름이 있으면, 이름 변경, 없으면 회원가입

        if(accountRepository.existsByName(userName)){

            attributes.setNew(true);
        }

        while (accountRepository.existsByName(userName)) {
            userName = userName + tail++;
        }

        String finalUserName = userName;

        Account findUser = accountRepository.findByEmail(attributes.getEmail())
                .map(user -> user.updateName(finalUserName))
                .orElse(accountMapper.toEntity(attributes));


        return accountRepository.save(findUser);

    }


}
