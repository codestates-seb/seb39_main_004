package run.ward.mmz.domain.post;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import run.ward.mmz.domain.post.Recipe;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Entity
@Table(name = "tag")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

    //연관관계 매핑
    protected void setRecipe(Recipe recipe){
        this.recipe = recipe;
        recipe.getTags().add(this);
    }

}
