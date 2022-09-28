package run.ward.mmz.domain.post;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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


    @OneToMany(mappedBy = "tag", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<RecipeTag> recipeTags = new ArrayList<>();


    protected void mappingRecipeTag(RecipeTag recipeTag) {
        if(!recipeTags.contains(recipeTag))
            this.recipeTags.add(recipeTag);
    }


    @Builder
    public Tag(String name) {
        this.name = name;
    }
}
