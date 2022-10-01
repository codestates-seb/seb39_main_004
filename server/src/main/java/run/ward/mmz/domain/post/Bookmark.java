package run.ward.mmz.domain.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    @JoinColumn(name = "ownerId", nullable = false)
    private Account owner;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "recipeId", nullable = false)
    private Recipe recipe;

    @Builder
    public Bookmark(Account owner, Recipe recipe) {
        this.owner = owner;
        this.recipe = recipe;
    }


    public void setBookmarked(Recipe recipe, Account account) {
        this.setRecipe(recipe);
        this.setOwner(account);
    }

    public void removeBookmarked(Recipe recipe, Account account) {
        this.removeRecipe(recipe);
        this.removeOwner(account);
    }

    protected void removeRecipe(Recipe recipe){
        recipe.removeBookmarks(this);
    }

    public void removeOwner(Account owner){
        owner.removeBookmarks(this);
    }

    protected void setRecipe(Recipe recipe){
        this.recipe = recipe;
        recipe.addBookmarks(this);
    }

    public void setOwner(Account owner){
        this.owner = owner;
        owner.addBookmarks(this);
    }



}
