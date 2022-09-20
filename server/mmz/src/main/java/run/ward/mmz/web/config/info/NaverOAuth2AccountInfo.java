package run.ward.mmz.web.config.info;

import java.util.Map;

public class NaverOAuth2AccountInfo extends OAuth2AccountInfo {

    public NaverOAuth2AccountInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getName() {
        return (String) attributes.get("nickname");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getPicture() {
        return (String) attributes.get("profile_image");
    }
}
