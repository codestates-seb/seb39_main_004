package run.ward.mmz.domain.account;


import lombok.*;
import run.ward.mmz.domain.auditable.Auditable;
import run.ward.mmz.domain.post.Bookmark;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.Review;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Setter
public class Account extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Lob
    private Long bio;

    private String password;

    @Column(nullable = false)
    private String email;

    @Column
    private String picture;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<Recipe> recipes = new LinkedHashSet<>();
    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<Bookmark> bookmarks = new LinkedHashSet<>();

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<Review> reviews = new LinkedHashSet<>();

    @Builder
    public Account(String name, String email, String picture, Role role){
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.role = role;
    }

    public Account update(String name, String picture){
        this.name = name;
        this.picture = picture;
        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }


    public void addBookmarks(Bookmark bookmark){
        bookmarks.add(bookmark);
        bookmark.setOwner(this);
    }

    public void addReview(Review review){
        reviews.add(review);
        review.setOwner(this);
    }

    public void addRecipe(Recipe recipe){
        recipes.add(recipe);
        recipe.setOwner(this);
    }

}
