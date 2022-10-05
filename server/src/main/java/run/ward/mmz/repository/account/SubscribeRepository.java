package run.ward.mmz.repository.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.subscribe.Subscribe;

import java.util.List;
import java.util.Optional;

public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {

    @Modifying //데이터베이스의 변경을 진행하는 (INSERT, DELETE, UPDATE를 네이티브 쿼리로 작성하려면 해당 어노테이션이 필요함
    @Query(value = "INSERT INTO subscribe(fromUserId, toUserId) VALUES(:fromUserId, :toUserId)", nativeQuery = true)
    void follow(Long fromUserId, Long toUserId); //성공하면 <변경된 행의 갯수>, 실패하면 -1(오류) 리턴

    @Modifying
    @Query(value = "DELETE FROM subscribe WHERE fromUserId =:fromUserId AND toUserId= :toUserId", nativeQuery = true)
    void unFollow(Long fromUserId, Long toUserId);

    @Query("select s from Subscribe s where s.toUser.id =:id order by s.id desc")
    List<Subscribe> findAllByToUserId(Long id);

    @Query("select s from Subscribe s where s.fromUser.id =:id order by s.id desc")
    List<Subscribe> findAllByFromUserId(Long id);

    Subscribe findByToUserAndFromUser(Account toUser, Account fromUser);

}