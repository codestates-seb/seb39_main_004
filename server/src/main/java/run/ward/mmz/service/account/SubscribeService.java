package run.ward.mmz.service.account;

import run.ward.mmz.domain.account.Account;

import java.util.List;

public interface SubscribeService {

    void follow(Long toUserId, Long forUserId);
    void unFollow(Long toUserId, Long forUserId);

    List<Account> findAllFollowUserByAccount(Long userId);
    List<Account> findAllFollowingUserByAccount(Long userId);

    int countFollowUserByAccount(Long userId);
    int countFollowingUserByAccount(Long userId);
    boolean existSubscribeByUserAndSessionUser(Account user, Account sessionUser);

}
