package run.ward.mmz.domain.post.bookmark;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.auditable.Auditable;
import run.ward.mmz.domain.post.recipe.Recipe;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "bookmark")
@NoArgsConstructor
public class Bookmark extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ownerId")
    private Account owner;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

    @Builder
    public Bookmark(Account owner, Recipe recipe) {
        this.owner = owner;
        this.recipe = recipe;
    }
}
