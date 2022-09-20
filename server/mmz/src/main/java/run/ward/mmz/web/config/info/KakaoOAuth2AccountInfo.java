package run.ward.mmz.web.config.info;

import java.util.Map;

public class KakaoOAuth2AccountInfo extends OAuth2AccountInfo {

    public KakaoOAuth2AccountInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getName() {
        return (String) attributes.get("profile_nickname");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("kakao_account_email");
    }

    @Override
    public String getPicture() {
        return (String) attributes.get("profile_image_url");
    }


}
