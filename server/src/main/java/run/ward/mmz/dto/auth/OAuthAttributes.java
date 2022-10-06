package run.ward.mmz.dto.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import run.ward.mmz.domain.account.Provider;

import java.util.Map;


@Getter
@Setter
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String key;
    private String name;
    private String email;
    private boolean isNew;
    private String provider;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String key, String name, String email, boolean isNew,  String provider) {
        this.attributes = attributes;
        this.key = key;
        this.isNew = isNew;
        this.name = name;
        this.email = email;
        this.provider = provider;
    }

    public static OAuthAttributes of(String regId,
                                     String attributeName,
                                     Map<String, Object> attributes) {

        if (regId.equals("kakao")) {
            return ofKakao(attributeName, attributes);
        }
        return ofGoogle(attributeName, attributes);
    }

    private static OAuthAttributes ofKakao(String attributeName, Map<String, Object> attributes) {

        Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");  // 카카오로 받은 데이터에서 계정 정보가 담긴 kakao_account 값을 꺼낸다.
        Map<String, Object> profile = (Map<String, Object>) kakao_account.get("profile");   // 마찬가지로 profile(nickname, image_url.. 등) 정보가 담긴 값을 꺼낸다.

        return OAuthAttributes.builder()
                .name((String) profile.get("nickname"))
                .email((String) kakao_account.get("email"))
                .attributes(attributes)
                .key(attributeName)
                .provider(Provider.KAKAO.getValue())
                .build();
    }


    public static OAuthAttributes ofGoogle(String attributeName,
                                           Map<String, Object> attributes) {

        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .attributes(attributes)
                .key(attributeName)
                .provider(Provider.GOOGLE.getValue())
                .build();
    }


}
