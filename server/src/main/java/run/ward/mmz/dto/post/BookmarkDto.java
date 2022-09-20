package run.ward.mmz.dto.post;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

public class BookmarkDto {

    @Builder
    @Data
    public static class Request{
        private String recipeId;
        private String ownerId;
    }

    @Builder
    @Data
    public static class Response implements Serializable {
        private boolean isBookmarked;
    }



}
