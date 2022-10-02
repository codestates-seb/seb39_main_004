package run.ward.mmz.domain.subscribe;

import lombok.*;
import run.ward.mmz.domain.account.Account;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "subscribe")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Setter(AccessLevel.PROTECTED)
public class Subscribe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "toUserId")
    @ManyToOne
    @ToString.Exclude
    private Account toUser;

    @JoinColumn(name = "fromUserId")
    @ManyToOne
    @ToString.Exclude
    private Account forUser;


}
