package run.ward.mmz.web.config.info;

import java.util.Map;

public class GoogleOAuth2AccountInfo extends OAuth2AccountInfo {

    public GoogleOAuth2AccountInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getPicture() {
        return (String) attributes.get("picture");
    }


}
