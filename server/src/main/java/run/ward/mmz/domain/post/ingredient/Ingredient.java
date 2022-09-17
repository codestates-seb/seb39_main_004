package run.ward.mmz.domain.post.ingredient;

import lombok.Getter;
import lombok.NoArgsConstructor;
import run.ward.mmz.domain.post.recipe.Recipe;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Entity
@Table(name = "ingredient")
@NoArgsConstructor
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String amount;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;


}
