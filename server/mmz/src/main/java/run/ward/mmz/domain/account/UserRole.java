package run.ward.mmz.domain.account;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserRole {
    ADMIN("ROLE_ADMIN", "admin"),
    USER("ROLE_USER", "user");

    private final String role;
    private final String name;
}