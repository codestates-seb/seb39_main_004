package run.ward.mmz.dto.post;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import run.ward.mmz.domain.post.Recipe;

import java.io.Serializable;
import java.util.Set;

public class RecipeDto {

    @Data
    @NoArgsConstructor
    public static class Request{

        private String title;
        private String youtubeUrl;
        private String thumbNailImage;
        private String perTime;
        private int stars;
        private Recipe.LevelType level;

        private Set<IngredientDto.Request> ingredients;
        private Set<DirectionDto.Request> directions;
        private Set<ReviewDto.Request> reviews;
        private Set<TagDto.Request> tags;

    }

    public static class Response implements Serializable {

        private Long recipeId;
        private String title;
        private String youtubeUrl;
        private String thumbNailImage;
        private String perTime;
        private int stars;
        private String level;
        private BookmarkDto.Response bookmark;
        private Set<IngredientDto.Response> ingredients;
        private Set<DirectionDto.Response> directions;
        private Set<ReviewDto.Response> reviews;
        private Set<TagDto.Response> tags;

        private String createDate;
        private String modifyDate;

    }

    public static class Info implements Serializable {

        private Long recipeId;
        private String title;
        private String youtubeUrl;
        private String thumbNailImage;
        private int stars;

        private BookmarkDto.Response bookmark;

        private Set<DirectionDto.Response> directions;
        private Set<TagDto.Response> tags;


        private String createDate;
        private String modifyDate;

    }
}
