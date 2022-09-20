package run.ward.mmz.domain.file.Image;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import run.ward.mmz.domain.file.File;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.domain.post.Recipe;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Getter
@Setter
@Table(name = "directionImage")
@NoArgsConstructor
public class DirectionImage extends File {

    @OneToOne
    private Direction direction;

}
