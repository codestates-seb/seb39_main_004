package run.ward.mmz.domain.post.review;

import lombok.Getter;
import lombok.NoArgsConstructor;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.auditable.Auditable;
import run.ward.mmz.domain.post.recipe.Recipe;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "review")
public class Review extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String body;

    private Integer stars;

    @ManyToOne
    @JoinColumn(name = "ownerId")
    private Account owner;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

}
