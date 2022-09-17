package run.ward.mmz.domain.post.recipe;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.auditable.Auditable;
import run.ward.mmz.domain.post.bookmark.Bookmark;
import run.ward.mmz.domain.post.direction.Direction;
import run.ward.mmz.domain.post.ingredient.Ingredient;
import run.ward.mmz.domain.post.review.Review;
import run.ward.mmz.domain.post.tag.Tag;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Entity
@NoArgsConstructor
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

    private String thumbNailImage;

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

    @Builder
    public Recipe(String title, String youtubeUrl, String thumbNailImage, String perTime, int views, Integer stars, Account owner, LevelType level, Set<Ingredient> ingredients, Set<Direction> directions, Set<Review> reviews, Set<Tag> tags, Set<Bookmark> bookmarks) {
        this.title = title;
        this.youtubeUrl = youtubeUrl;
        this.thumbNailImage = thumbNailImage;
        this.perTime = perTime;
        this.views = views;
        this.stars = stars;
        this.owner = owner;
        this.level = level;
        this.ingredients = ingredients;
        this.directions = directions;
        this.reviews = reviews;
        this.tags = tags;
        this.bookmarks = bookmarks;
    }
}
