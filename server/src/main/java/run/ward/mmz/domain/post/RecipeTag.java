package run.ward.mmz.domain.post;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "RecipeTag")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecipeTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

    public void setRecipe(Recipe recipe){
        this.recipe = recipe;
        recipe.getRecipeTags().add(this);
    }



}
