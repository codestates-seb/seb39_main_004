package run.ward.mmz.dto;

import lombok.Builder;
import lombok.Getter;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.account.Role;

import java.util.Map;

@Getter
public class OAuthAttributesDto {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;

    @Builder
    public OAuthAttributesDto(Map<String, Object> attributes, String nameAttributeKey, String name, String email, String picture){
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.picture = picture;
    }
    //반환하는 사용자 정보는 Map이라 값 하나하나 변환 필요
    public static OAuthAttributesDto of(String registrationId, String accountNameAttributeName, Map<String, Object> attributes){
        if("naver".equals(registrationId)){
            return ofNaver("id", attributes);
        }
        else if("kakao".equals(registrationId)){
            return ofKakao("id", attributes);
        }
        return ofGoogle(accountNameAttributeName, attributes);
    }

    public static OAuthAttributesDto ofGoogle(String accountNameAttributeName, Map<String, Object> attributes){
        return OAuthAttributesDto.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .nameAttributeKey(accountNameAttributeName)
                .build();
    }

    public static OAuthAttributesDto ofNaver(String accountNameAttributeName, Map<String, Object> attributes){
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuthAttributesDto.builder()
                .name((String) response.get("name"))
                .email((String) response.get("email"))
                .picture((String) response.get("profile_image"))
                .attributes(response)
                .nameAttributeKey(accountNameAttributeName)
                .build();
    }

    public static OAuthAttributesDto ofKakao(String accountNameAttributeName, Map<String, Object> attributes){
        Map<String, Object> id = (Map<String, Object>) attributes.get("id");

        return OAuthAttributesDto.builder()
                .name((String) id.get("profile_nickname"))
                .email((String) id.get("account_email"))
                .picture((String) id.get("profile_image"))
                .attributes(id)
                .nameAttributeKey(accountNameAttributeName)
                .build();
    }



    //처음 가입 시 빌더
    //처음 권한 GUEST
    public Account toEntity(){
        return Account.builder()
                .name(name)
                .email(email)
                .picture(picture)
                .role(Role.GUEST)
                .build();
    }
}
