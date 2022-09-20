package run.ward.mmz.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.account.AuthProvider;
import run.ward.mmz.domain.account.Role;
import run.ward.mmz.dto.CustomAccountDetails;
import run.ward.mmz.repository.AccountRepository;
import run.ward.mmz.web.config.info.OAuth2AccountInfo;
import run.ward.mmz.web.config.info.OAuth2AccountInfoFactory;

import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class CustomOAuth2AccountService extends DefaultOAuth2UserService{

    private final AccountRepository accountRepository;

    //OAuth2UserRequest에 있는 Access Token으로 유저정보 얻음
    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException{
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        return process(oAuth2UserRequest, oAuth2User);
    }

    //얻은 유저정보를 자바 Model과 맵핑 후 프로세스 진행
    private OAuth2User process(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User){
        AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());
        OAuth2AccountInfo accountInfo = OAuth2AccountInfoFactory.getOAuth2UserInfo(authProvider, oAuth2User.getAttributes());

        if(accountInfo.getEmail().isEmpty()) {
            throw new OAuthProcessingException("OAuth2 Provider에 이메일이 없습니다.");
        }
        Optional<Account> accountOptional = accountRepository.findByEmail(accountInfo.getEmail());
        Account account;

        if(accountOptional.isPresent()){ //이미 가입된 경우
            account = accountOptional.get();
            if(authProvider != account.getAuthProvider()){
                throw new OAuthProcessingException("Auth Provider와 매치가 되지 않습니다.");
            }
        }else{
            account = createAccount(accountInfo, authProvider);
        }
        return CustomAccountDetails.create(account, oAuth2User.getAttributes());
    }

    private Account createAccount(OAuth2AccountInfo accountInfo, AuthProvider authProvider){
        Account account = Account.builder()
                .email(accountInfo.getEmail())
                .picture(accountInfo.getPicture())
                .role(Role.USER)
                .authProvider(authProvider)
                .build();
        return accountRepository.save(account);
    }

}















/*
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    public final AccountRepository accountRepository;
    public final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{

        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        //로그인 진행 중 서비스 구분 코드
        //구글, 네이버, 카카오 구분
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        //OAuth2 로그인 진행 시 키가 되는 필드 값
        String accountNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributesDto attributes = OAuthAttributesDto.of(registrationId, accountNameAttributeName, oAuth2User.getAttributes());

        Account account = saveOrUpdate(attributes);
        httpSession.setAttribute("account", new SessionAccount(account));

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(account.getRoleKey())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey());

    }

    private Account saveOrUpdate(OAuthAttributesDto attributes){
        Account account = accountRepository.findByEmail(attributes.getEmail())
                .map(entity -> entity.update(attributes.getName(), attributes.getPicture()))
                .orElse(attributes.toEntity());

        return accountRepository.save(account);
    }

}


 */