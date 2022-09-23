package run.ward.mmz.domain.post;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.auditable.Auditable;
import run.ward.mmz.domain.file.Image.ThumbNailImage;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "recipe")
public class Recipe extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank
    private String title;

    private String youtubeUrl;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "thumbnailId")
    private ThumbNailImage thumbNail;

    @Column(nullable = false)
    @NotBlank
    private String perTime;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int views;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int stars;

    @ManyToOne
    @JoinColumn(name = "ownerId")
    private Account owner;

    @Column
    @Enumerated(value = EnumType.STRING)
    private LevelType level = LevelType.BASIC;

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<Ingredient> ingredients = new LinkedHashSet<>();

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<Direction> directions = new LinkedHashSet<>();

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<Review> reviews = new LinkedHashSet<>();

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<Tag> tags = new LinkedHashSet<>();

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<Bookmark> bookmarks = new LinkedHashSet<>();

    // 연관관계 메서드
    public void setOwner(Account owner) {
        this.owner = owner;
        owner.getRecipes().add(this);
    }

    protected void setThumbnail(ThumbNailImage thumbNail) {
        this.thumbNail = thumbNail;
        thumbNail.setRecipe(this);
    }

    protected void addIngredients(Ingredient ingredient) {
        ingredients.add(ingredient);
        ingredient.setRecipe(this);
    }

    protected void addDirections(Direction direction) {
        directions.add(direction);
        direction.setRecipe(this);
    }

    protected void addReviews(Review review) {
        reviews.add(review);
        review.setRecipe(this);
    }

    protected void addTags(Tag tag) {
        tags.add(tag);
        tag.setRecipe(this);
    }

    protected void removeBookmarks(Bookmark bookmark) {
        bookmarks.remove(bookmark);
    }
    protected void removeIngredients(Ingredient ingredient) {
        ingredients.add(ingredient);
        ingredient.setRecipe(this);
    }

    protected void removeDirections(Direction direction) {
        directions.add(direction);
        direction.setRecipe(this);
    }

    protected void removeReviews(Review review) {
        reviews.add(review);
        review.setRecipe(this);
    }

    protected void removeTags(Tag tag) {
        tags.add(tag);
        tag.setRecipe(this);
    }

    protected void addBookmarks(Bookmark bookmark) {
        bookmarks.add(bookmark);
        bookmark.setRecipe(this);
    }


    @Builder
    public Recipe(String title, String youtubeUrl, String perTime, int views, int stars, LevelType level) {
        this.title = title;
        this.youtubeUrl = youtubeUrl;
        this.perTime = perTime;
        this.views = views;
        this.stars = stars;
        this.level = level;
    }


    @Getter
    @RequiredArgsConstructor
    public enum LevelType {

        BASIC("BASIC"),
        INTERMEDIATE("INTERMEDIATE"),
        ADVANCED("ADVANCED");

        private final String level;

    }

    // 레시피 생성 메서드
    public static Recipe createRecipe(String title, String youtubeUrl, ThumbNailImage thumbNail, String perTime, int views, int stars, Account owner, LevelType level, Set<Ingredient> ingredients, Set<Direction> directions, Set<Review> reviews, Set<Tag> tags, Set<Bookmark> bookmarks) {

        //Todo : 잘못된 값 혹은 null값이 들어올 경우 처리할 수 있는 Exception이 있어야한다.

        Recipe recipe = Recipe.builder()
                .title(title)
                .youtubeUrl(youtubeUrl)
                .perTime(perTime)
                .views(views)
                .stars(stars)
                .level(level)
                .build();

        recipe.setOwner(owner);
        recipe.setThumbnail(thumbNail);

        for (Ingredient ingredient : ingredients) {
            recipe.addIngredients(ingredient);
        }

        for (Direction direction : directions) {
            recipe.addDirections(direction);
        }

        for (Review review : reviews) {
            recipe.addReviews(review);
        }

        for (Tag tag : tags) {
            recipe.addTags(tag);
        }

        for (Bookmark bookmark : bookmarks) {
            recipe.addBookmarks(bookmark);
        }

        return recipe;
    }



    /**
     * 비즈니스 로직
     *
     */

    public void updateStars(int num){

        if(num < 0 ){
            //ToDo : setStars 는 0보다 작은 값이 들어 갈 수 없음. -> Exception
        }
        else if( num > 5){
            //ToDo : setStars 는 5보다 큰 값이 들어 갈 수 없음. -> Exception
        }
        else{
            this.stars = num;
        }

    }

    public void updateViews(int views){
        if(views < 0){
            //ToDo : views 는 0 보다 작은 값이 들어 갈 수 없음. -> Exception
        }
        this.views = views;
    }

    public void updateThumbNail(ThumbNailImage image){

    }


    /**
     * 레시피 삭제
     */



}
