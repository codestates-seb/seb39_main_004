package run.ward.mmz.domain.post;

import lombok.*;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.auditable.Auditable;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "bookmark")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    public void setRecipe(Recipe recipe){
        this.recipe = recipe;
        recipe.getBookmarks().add(this);
    }

    public void setOwner(Account owner){
        this.owner = owner;
        owner.getBookmarks().add(this);
    }



}
