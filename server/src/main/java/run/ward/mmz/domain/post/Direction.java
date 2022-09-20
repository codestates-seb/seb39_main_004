package run.ward.mmz.domain.post;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import run.ward.mmz.domain.file.Image.DirectionImage;
import run.ward.mmz.domain.file.Image.ThumbNailImage;

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

    @Lob
    @NotBlank
    private String body;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "directionId")
    private DirectionImage image;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

    // 연관관계 메서드
    public void setImage(DirectionImage image){
        this.image = image;
        image.setDirection(this);
    }

    public void setRecipe(Recipe recipe){
        this.recipe = recipe;
        recipe.getDirections().add(this);
    }

}
