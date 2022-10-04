package run.ward.mmz.domain.subscribe;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import run.ward.mmz.domain.account.Account;

import javax.persistence.*;

@Getter
@Entity

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter(AccessLevel.PROTECTED)
@Table(
        name = "subscribe",
        uniqueConstraints = {
                @UniqueConstraint(
                        name="subscribe_uk",
                        columnNames = {"fromUserId", "toUserId"}
                )
        }
)
public class Subscribe{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "toUserId")
    @ManyToOne
    @JsonIgnore
    private Account toUser;

    @JoinColumn(name = "fromUserId")
    @ManyToOne
    @JsonIgnore
    private Account fromUser;




}
