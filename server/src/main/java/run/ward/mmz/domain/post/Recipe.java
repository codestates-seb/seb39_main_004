package run.ward.mmz.domain.post;

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

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "thumbnailId")
    private Files imgThumbNail;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int views;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int stars;

    @NotBlank
    @Column(nullable = false)
    private String category;

    @ManyToOne
    @JoinColumn(name = "ownerId")
    private Account owner;

    @Column
    @Enumerated(value = EnumType.STRING)
    private LevelType level = LevelType.BASIC;

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Ingredient> ingredients = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Direction> directions = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Bookmark> bookmarks = new ArrayList<>();

    // 연관관계 메서드
    public void setOwner(Account owner) {
        this.owner = owner;
        owner.getRecipes().add(this);
    }

    protected void setThumbnail(Files imgThumbNail) {
        this.imgThumbNail = imgThumbNail;
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


    protected void removeBookmarks(Bookmark bookmark) {
        bookmarks.remove(bookmark);
    }

    protected void addBookmarks(Bookmark bookmark) {
        bookmarks.add(bookmark);
        bookmark.setRecipe(this);
    }


    @Builder
    public Recipe(String title, String category, int views, int stars, LevelType level) {
        this.title = title;
        this.category = category;
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
    public static Recipe createRecipe(String title, String category, Files imgThumbNail, int stars, Account owner, LevelType level, List<Ingredient> ingredients, List<Direction> directions ) {

        //Todo : 잘못된 값 혹은 null값이 들어올 경우 처리할 수 있는 Exception이 있어야한다.

        Recipe recipe = Recipe.builder()
                .title(title)
                .category(category)
                .stars(stars)
                .level(level)
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



    /**
     * 레시피 삭제
     */



}
