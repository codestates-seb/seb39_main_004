package run.ward.mmz.domain.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.jetbrains.annotations.NotNull;
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
    @JoinColumn(name = "ownerId")
    @NotNull
    private Account owner;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "recipeId")
    @NotNull
    private Recipe recipe;

    @Builder
    public Bookmark(@NotNull Account owner, @NotNull Recipe recipe) {
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

    protected void removeRecipe(@NotNull Recipe recipe){
        this.recipe = null;
        recipe.removeBookmarks(this);
    }

    public void removeOwner(@NotNull Account owner){
        this.owner = null;
        owner.removeBookmarks(this);
    }

    protected void setRecipe(@NotNull Recipe recipe){
        this.recipe = recipe;
        recipe.addBookmarks(this);
    }

    public void setOwner(@NotNull Account owner){
        this.owner = owner;
        owner.addBookmarks(this);
    }






}