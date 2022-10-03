package run.ward.mmz.handler.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ExceptionCode {


    LOGIN_FAILED(403,"Login failed."),
    USER_ACCESS_DENIED(403,"Access Denied User."),
    USER_UNAUTHORIZED(401, "User Unauthorized."),
    USER_NOT_FOUND(404, "User not found."),
    USER_EXISTS(409, "User exists."),


    SUBSCRIBE_FOLLOWING_USER_NOT_FOUND(404, "Following User not found."),
    SUBSCRIBE_FOLLOWING_USER_EXISTS(409, "Following User exists."),
    SUBSCRIBE_FOLLOW_USER_NOT_FOUND(404, "Follow User not found."),
    SUBSCRIBE_FOLLOW_USER_EXISTS(409, "Follow User exists."),

    SUBSCRIBE_METHOD_NOT_ALLOWED(405, "Follow Method not allow."),


    RECIPE_NOT_FOUND(404, "Recipe not found."),
    RECIPE_EXISTS(409, "Recipe exists."),

    INGREDIENT_NOT_FOUND(404, "Ingredient not found."),
    INGREDIENT_EXISTS(409, "Ingredient exists."),

    DIRECTION_NOT_FOUND(404, "Direction not found."),
    DIRECTION_EXISTS(409, "Direction exists."),

    REVIEW_NOT_FOUND(404, "Review not found."),
    REVIEW_EXISTS(409, "Review exists."),

    BOOKMARK_NOT_FOUND(404, "Bookmark not found."),
    BOOKMARK_EXISTS(409, "Bookmark exists."),

    TAG_NOT_FOUND(404, "Tag not found."),
    TAG_EXISTS(409, "Tag exists."),

    FILE_NOT_FOUND(404, "File not found."),
    FILE_UPLOAD_FAILED(417, "File upload fail."),
    FILE_SIZE_EXCEED(431,"File size exceed."),
    FILE_EXTENSION_INVALID(431,"File extension invalid.");

    private final int status;
    private final String message;

}
