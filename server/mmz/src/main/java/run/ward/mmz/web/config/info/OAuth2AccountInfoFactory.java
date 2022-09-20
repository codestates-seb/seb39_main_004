package run.ward.mmz.web.config.info;

import run.ward.mmz.domain.account.AuthProvider;

import java.util.Map;

public class OAuth2AccountInfoFactory {
    public static OAuth2AccountInfo getOAuth2UserInfo(AuthProvider authProvider, Map<String, Object> attributes){
        switch (authProvider) {
            case GOOGLE: return new GoogleOAuth2AccountInfo(attributes);
            case NAVER: return new NaverOAuth2AccountInfo(attributes);
            case KAKAO: return new KakaoOAuth2AccountInfo(attributes);
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}
