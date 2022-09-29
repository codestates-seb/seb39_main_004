package run.ward.mmz.domain.account;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column
    private String picture;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column
    private String authProvider;

    @Column
    private String refreshToken;

    @Builder
    public Account(String name, String email, String picture, Role role, String authProvider, String refreshToken){
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.role = role;
        this.authProvider = authProvider;

    }

    public Account update(String name, String picture, String authProvider){
        this.name = name;
        this.picture = picture;
        this.authProvider = authProvider;


        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }
}
