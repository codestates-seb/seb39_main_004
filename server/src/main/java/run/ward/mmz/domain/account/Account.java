package run.ward.mmz.domain.account;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import run.ward.mmz.domain.auditable.Auditable;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.*;
import run.ward.mmz.domain.subscribe.Subscribe;
import run.ward.mmz.dto.respones.AccountInfoDto;

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

    @Column(nullable = false, unique = true)
    private String name;

    @Lob
    private String bio;

    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private boolean isNew = true;
    @Column
    private String imgProfileUrl;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "profileId")
    private Files imgProfile;

    @Column(nullable = false)
    private String provider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Recipe> recipes = new ArrayList<>();
    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Bookmark> bookmarks = new ArrayList<>();
    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "toUser", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Subscribe> followings = new ArrayList<>();
    @OneToMany(mappedBy = "forUser", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Subscribe> followers = new ArrayList<>();

    @Builder
    public Account(String name, String email, String password, String imgProfileUrl, Role role, String provider){
        this.name = name;
        this.email = email;
        this.password = password;
        this.imgProfileUrl = imgProfileUrl;
        this.role = role;
        this.provider = provider;
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

    @JsonIgnore
    public String getRoleKey() {
        return this.role.getKey();
    }

    @JsonIgnore
    public String getProvider() {
        return this.provider;
    }

    public Account updateInfo(AccountInfoDto accountInfoDto) {
        this.name = accountInfoDto.getName();
        this.bio = accountInfoDto.getBio();
        this.isNew = false;
        return this;
    }

    @JsonIgnore
    public Account updateName(String name) {
        this.name = name;
        return this;
    }

    public void registerUser(Account account, String imgProfileUrl, boolean isNew, String password, Role role, String provider) {
        this.name = account.name;
        this.imgProfileUrl = imgProfileUrl;
        this.isNew = isNew;
        this.email = account.email;
        this.password = password;
        this.role = role;
        this.provider = provider;
    }

    @JsonIgnore
    public Account updateImgProfile(Files imgProfile){
        this.imgProfile = imgProfile;
        this.imgProfileUrl = imgProfile.getFileName();

        return this;
    }


    @JsonIgnore
    public List<Recipe> getRecipeList(){

        if(this.bookmarks == null || this.bookmarks.isEmpty())
            return new ArrayList<>();

        List<Recipe> recipeList = new ArrayList<>();

        for(Bookmark bookmark : this.bookmarks) {
            recipeList.add(bookmark.getRecipe());
        }
        return recipeList;
    }

    @JsonIgnore
    public List<Account> getFollowerUserList(){

        if(this.followers == null || this.followers.isEmpty())
            return new ArrayList<>();

        List<Account> followerList = new ArrayList<>();

        for(Subscribe subscribe : this.followers ) {
            followerList.add(subscribe.getToUser());
        }

        return followerList;
    }

    @JsonIgnore
    public List<Account> getFollowingUserList(){

        if(this.followers == null || this.followers.isEmpty())
            return new ArrayList<>();

        List<Account> followingList = new ArrayList<>();

        for(Subscribe subscribe : this.followers ) {
            followingList.add(subscribe.getForUser());
        }

        return followingList;
    }


}
