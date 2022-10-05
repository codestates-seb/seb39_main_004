package run.ward.mmz.domain.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.auditable.Auditable;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "review")
public class Review extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String body;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int stars;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ownerId")
    private Account owner;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

    // 연관관계 메서드
    public void setOwner(Account owner) {
        this.owner = owner;
        if(!owner.getReviews().contains(this))
            owner.getReviews().add(this);
    }

    public void setRecipe(Recipe recipe){
        this.recipe = recipe;
        if(!recipe.getReviews().contains(this))
            recipe.getReviews().add(this);
    }

    @Builder
    public Review(String body, int stars) {
        this.body = body;
        this.stars = stars;
    }

    public static Review createReview(String body, int stars, Account owner, Recipe recipe) {

        Review review = Review.builder()
                .body(body)
                .stars(stars)
                .build();

        review.setOwner(owner);
        review.setRecipe(recipe);

        return review;
    }
}
