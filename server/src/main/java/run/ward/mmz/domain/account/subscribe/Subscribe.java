package run.ward.mmz.domain.account.subscribe;

import lombok.Getter;
import lombok.NoArgsConstructor;
import run.ward.mmz.domain.account.Account;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "subscribe")
@NoArgsConstructor
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
