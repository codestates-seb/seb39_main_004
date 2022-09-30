package run.ward.mmz.domain.account;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import run.ward.mmz.domain.auditable.Auditable;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


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
    private String bio;

    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String imgProfileUrl;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "profileId")
    private Files imgProfile;


    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Recipe> recipes = new ArrayList<>();
    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Bookmark> bookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Review> reviews = new ArrayList<>();

    @Builder
    public Account(String name, String email, String password, String imgProfileUrl, Role role){
        this.name = name;
        this.email = email;
        this.password = password;
        this.imgProfileUrl = imgProfileUrl;
        this.role = role;
    }


    public void addBookmarks(Bookmark bookmark) {
        if(!bookmarks.contains(bookmark)) {
            bookmarks.add(bookmark);
            bookmark.setOwner(this);
        }

    }


    public void removeBookmarks(Bookmark bookmark) {
        bookmarks.remove(bookmark);
    }

    public void addReview(Review review){
        if(!reviews.contains(review)){
            reviews.add(review);
            review.setOwner(this);
        }

    }
    public void addRecipe(Recipe recipe){
        if(!recipes.contains(recipe)) {
            recipes.add(recipe);
            recipe.setOwner(this);
        }

    }

    public void registerUser(Account account, String password, Role role) {
        this.name = account.name;
        this.email = account.email;
        this.password = password;
        this.role = role;
    }


    @JsonIgnore
    public List<Recipe> getRecipeList(){

        List<Recipe> recipeList = new ArrayList<>();

        for(Bookmark bookmark : this.bookmarks) {
            recipeList.add(bookmark.getRecipe());
        }

        return recipeList;
    }

}
