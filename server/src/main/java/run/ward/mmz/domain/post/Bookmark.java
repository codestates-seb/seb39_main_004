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

    public void setRecipe(@NotNull Recipe recipe){
        this.recipe = recipe;
        recipe.getBookmarks().add(this);
    }

    public void setOwner(@NotNull Account owner){
        this.owner = owner;
        owner.getBookmarks().add(this);
    }

    public void mappingBookmark(Recipe recipe, Account owner) {
        this.recipe = recipe;
        this.owner = owner;
    }



}
