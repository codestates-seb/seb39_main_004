package run.ward.mmz.dto.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import run.ward.mmz.domain.account.Provider;

import java.util.Map;


@Getter
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String key;
    private String name;
    private String email;
    private Provider provider;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String key, String name, String email, Provider provider) {
        this.attributes = attributes;
        this.key = key;
        this.name = name;
        this.email = email;
        this.provider = provider;
    }

    public static OAuthAttributes of(String regId,
                                     String attributeName,
                                     Map<String, Object> attributes) {

        return ofGoogle(attributeName, attributes);
    }

    public static OAuthAttributes ofGoogle(String attributeName,
                                           Map<String, Object> attributes) {

        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .attributes(attributes)
                .key(attributeName)
                .provider(Provider.GOOGLE)
                .build();
    }


}
