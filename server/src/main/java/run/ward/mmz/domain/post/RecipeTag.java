package run.ward.mmz.domain.post;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Table(name = "RecipeTag")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecipeTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "tagId")
    private Tag tag;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "recipeId")
    private Recipe recipe;


    public void deleteRecipe( ) {
        this.recipe = null;
        this.tag = null;
    }


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


}
