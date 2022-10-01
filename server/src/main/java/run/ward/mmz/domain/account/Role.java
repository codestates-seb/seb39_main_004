package run.ward.mmz.domain.account;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public enum Role {
    GUEST("ROLE_GUEST"),
    USER("ROLE_USER");

    private final String key;

    Role(String key) {
        this.key = key;
    }
}
