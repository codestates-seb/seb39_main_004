package run.ward.mmz.domain.post;

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
    private int index;

    @Lob
    @NotBlank
    private String body;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "fileId")
    @ToString.Exclude
    private Files files;

    @ManyToOne
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

    @Builder
    public Direction(int index, String body, Files files, Recipe recipe) {
        this.index = index;
        this.body = body;
        this.files = files;
        this.recipe = recipe;
    }
}
