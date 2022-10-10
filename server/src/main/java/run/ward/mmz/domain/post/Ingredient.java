package run.ward.mmz.domain.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Entity
@Setter(AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "integer default 1", nullable = false)
    private int idx;

    @NotBlank
    private String name;

    @NotBlank
    private String amount;

    @NotNull
    @Column(columnDefinition = "boolean default false", nullable = false)
    private boolean isEssential;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

    public void setRecipe(Recipe recipe){
        this.recipe = recipe;
        if(!recipe.getIngredients().contains(this))
            recipe.getIngredients().add(this);
    }

    public void deleteRecipe(){
        this.recipe = null;
    }

    @Builder
    public Ingredient(int index, String name, String amount, boolean isEssential, Recipe recipe) {
        this.idx = index;
        this.name = name;
        this.amount = amount;
        this.isEssential = isEssential;
        this.recipe = recipe;
    }
}
