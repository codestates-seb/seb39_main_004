package run.ward.mmz.web.config.info;

import java.util.Map;

public abstract class OAuth2AccountInfo {
    protected Map<String, Object> attributes;

    public OAuth2AccountInfo(Map<String, Object> attributes){
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes(){
        return attributes;
    }

    public abstract String getId();
    public abstract String getName();
    public abstract String getEmail();
    public abstract String getPicture();
}
