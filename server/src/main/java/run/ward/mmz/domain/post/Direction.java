package run.ward.mmz.domain.post;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    private Files files;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

    // 연관관계 메서드

    public void setRecipe(Recipe recipe){
        this.recipe = recipe;
        recipe.getDirections().add(this);
    }

    @Builder
    public Direction(int index, String body, Files file, Recipe recipe) {
        this.index = index;
        this.body = body;
        this.files = file;
        this.recipe = recipe;
    }
}
