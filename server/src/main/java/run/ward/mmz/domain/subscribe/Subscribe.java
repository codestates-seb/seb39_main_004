package run.ward.mmz.domain.subscribe;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
    private Account toUser;

    @JoinColumn(name = "fromUserId")
    @ManyToOne
    private Account forUser;


}
