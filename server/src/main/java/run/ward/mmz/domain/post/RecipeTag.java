package run.ward.mmz.domain.post;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
@Table(name = "RecipeTag")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecipeTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "tagId")
    private Tag tag;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

    public void mappingRecipe(Recipe recipe){
        this.recipe = recipe;
        recipe.mappingRecipeTag(this);
    }

    public void mappingTag(Tag tag){
        this.tag = tag;
        tag.mappingRecipeTag(this);
    }

    @Builder
    public RecipeTag(Tag tag, Recipe recipe) {
        this.tag = tag;
        this.recipe = recipe;
    }

    public Tag getTagByRecipe(Recipe recipe){
        if(recipe.getId().equals(this.recipe.getId()))
            return this.tag;
        else
            return null;
    }

    public Recipe getRecipeByTag(Tag tag){
        if(tag.getId().equals(this.tag.getId()))
            return this.recipe;
        else
            return null;
    }

}
