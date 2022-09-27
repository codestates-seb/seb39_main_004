package run.ward.mmz.domain.post;

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
    private int index;

    @NotBlank
    private String name;

    @NotBlank
    private String amount;

    @NotNull
    @ColumnDefault("false")
    private boolean isEssential = false;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

    public void setRecipe(Recipe recipe){
        this.recipe = recipe;
        recipe.getIngredients().add(this);
    }

    @Builder
    public Ingredient(int index, String name, String amount, boolean isEssential, Recipe recipe) {
        this.index = index;
        this.name = name;
        this.amount = amount;
        this.isEssential = isEssential;
        this.recipe = recipe;
    }
}
