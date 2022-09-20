package run.ward.mmz.domain.file.Image;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import run.ward.mmz.domain.file.File;
import run.ward.mmz.domain.post.Recipe;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "thumbImage")
@NoArgsConstructor
public class ThumbNailImage extends File {

    @OneToOne
    private Recipe recipe;

}
