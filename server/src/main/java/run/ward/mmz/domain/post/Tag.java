package run.ward.mmz.domain.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Table(name = "Tag")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "tag", fetch = FetchType.LAZY)
    private List<RecipeTag> recipeTags = new ArrayList<>();

    protected void mappingRecipeTag(RecipeTag recipeTag) {
        if(!recipeTags.contains(recipeTag))
            this.recipeTags.add(recipeTag);
    }

    @JsonIgnore
    public List<Recipe> getRecipeList(){

        List<Recipe> recipeList = new ArrayList<>();

        for(RecipeTag recipeTag : this.recipeTags) {
            recipeList.add(recipeTag.getRecipe());
        }
        return recipeList;
    }


    @Builder
    public Tag(String name) {
        this.name = name;
    }
}
