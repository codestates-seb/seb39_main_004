package run.ward.mmz.domain.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import run.ward.mmz.domain.file.Files;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Entity
@Table(name = "direction")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Direction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "integer default 1", nullable = false)
    private int idx;

    @Lob
    @NotBlank
    private String body;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "fileId")
    private Files files;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

    public void setFiles(Files files) {
        this.files = files;
    }

    // 연관관계 메서드

    public void setRecipe(Recipe recipe){
        this.recipe = recipe;
        if(!recipe.getDirections().contains(this))
            recipe.getDirections().add(this);
    }

    public void deleteRecipe(){
        this.recipe = null;
    }



    @Builder
    public Direction(Long id, int index, String body, Files files, Recipe recipe) {
        this.idx = index;
        this.body = body;
        this.files = files;
        this.recipe = recipe;
    }
}
