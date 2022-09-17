package run.ward.mmz.domain.post.bookmark;

import lombok.Getter;
import lombok.NoArgsConstructor;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.recipe.Recipe;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "bookmark")
@NoArgsConstructor
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ownerId")
    private Account owner;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

}
