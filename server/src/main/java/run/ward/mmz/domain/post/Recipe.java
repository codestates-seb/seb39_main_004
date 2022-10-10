package run.ward.mmz.domain.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.auditable.Auditable;
import run.ward.mmz.domain.file.Files;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

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

    @Lob
    @NotBlank
    private String body;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "thumbnailId")
    private Files imgThumbNail;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int views;

    @Column(columnDefinition = "double default 0", nullable = false)
    private double stars;

    @Column(columnDefinition = "boolean default false", nullable = false)
    private boolean isBookmarked;

    @NotBlank
    @Column(nullable = false)
    private String category;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "ownerId")
    private Account owner;


    //orphanRemoval=true 영속성에서 관계가 끊어질 경우 commit 시점에서 삭제
    @JsonIgnore
    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Ingredient> ingredients = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Direction> directions = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<RecipeTag> recipeTags = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Review> reviews = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Bookmark> bookmarks = new ArrayList<>();

    public void setBookmarks(List<Bookmark> bookmarks) {
        this.bookmarks = bookmarks;
    }


    // 연관관계 메서드
    public void setOwner(Account owner) {
        this.owner = owner;
        owner.getRecipes().add(this);
    }

    protected void setThumbnail(Files imgThumbNail) {
        this.imgThumbNail = imgThumbNail;
    }

    protected void addIngredients(Ingredient ingredient) {
        if (!ingredients.contains(ingredient))  // ingredients가 list이므로 중복 허용, DB에는 중복되어있지 않지만, entity 객체에는 중복으로 들어가있음.
            ingredients.add(ingredient);
        ingredient.setRecipe(this);
    }


    protected void addDirections(Direction direction) {
        if (!directions.contains(direction)) // directions가 list이므로 중복 허용, DB에는 중복되어있지 않지만, entity 객체에는 중복으로 들어가있음.
            directions.add(direction);
        direction.setRecipe(this);
    }

    protected void addReviews(Review review) {

        if (!reviews.contains(review)) {
            reviews.add(review);
            review.setRecipe(this);
        }

    }

    protected void mappingRecipeTag(RecipeTag recipeTag) {
        if (!recipeTags.contains(recipeTag))
            this.recipeTags.add(recipeTag);
    }

    public void removeAllDirection(){
        for(Direction direction : directions){
            direction.deleteRecipe();
        }
        directions = new ArrayList<>();
    }

    public void removeAllIngredients(){
        for(Ingredient ingredient : ingredients){
            ingredient.deleteRecipe();
        }
        ingredients = new ArrayList<>();
    }

    public void removeAllRecipeTag(){
        for(RecipeTag recipeTag : recipeTags){
            recipeTag.deleteRecipe();
        }
        recipeTags = new ArrayList<>();
    }



    public void removeBookmarks(Bookmark bookmark) {
        bookmarks.remove(bookmark);
        isBookmarked = false;
    }

    public void addBookmarks(Bookmark bookmark) {

        if (!bookmarks.contains(bookmark)) {
            bookmarks.add(bookmark);
            isBookmarked = true;
            bookmark.setRecipe(this);
        }


    }


    @Builder
    public Recipe(String title, String body, String category, int views, int stars) {
        this.title = title;
        this.body = body;
        this.category = category;
        this.views = views;
        this.stars = stars;
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
    @Builder
    @JsonIgnore
    public static Recipe createRecipe(String title, String body, String category, Files imgThumbNail, Account owner, List<Ingredient> ingredients, List<Direction> directions) {

        //Todo : 잘못된 값 혹은 null값이 들어올 경우 처리할 수 있는 Exception이 있어야한다.

        Recipe recipe = Recipe.builder()
                .title(title)
                .category(category)
                .body(body)
                .build();

        recipe.setOwner(owner);
        recipe.setThumbnail(imgThumbNail);

        for (Ingredient ingredient : ingredients) {
            recipe.addIngredients(ingredient);
        }

        for (Direction direction : directions) {
            recipe.addDirections(direction);
        }


        return recipe;
    }

    @JsonIgnore
    public Recipe updateRecipe(String title, String body, String category, Files imgThumbNail, List<Ingredient> ingredients, List<Direction> directions) {


        this.title = title;
        this.body = body;
        this.category = category;

        this.setThumbnail(imgThumbNail);

        for (Ingredient ingredient : ingredients) {
            this.addIngredients(ingredient);
        }

        for (Direction direction : directions) {
            this.addDirections(direction);
        }


        return this;
    }



    /**
     * 비즈니스 로직
     */

    public void addViews() {
        if (views < 0) {
            //ToDo : views 는 0 보다 작은 값이 들어 갈 수 없음. -> Exception
        }
        this.views += 1;
    }

    public void updateStars() {

        double stars = 0;

        for (Review review : reviews) {
            stars += review.getStars();
            this.stars = stars / reviews.size();
        }

    }

    @JsonIgnore
    public List<Tag> getTagList() {

        if(this.recipeTags == null || this.recipeTags.isEmpty())
            return new ArrayList<>();

        List<Tag> tagList = new ArrayList<>();

        for (RecipeTag recipeTag : this.recipeTags) {
            tagList.add(recipeTag.getTag());
        }

        return tagList;
    }


//    public void deleteAllRecipeTag(){
//        this.recipeTags = new ArrayList<>();
//    }


    /**
     * 레시피 삭제
     */


}
