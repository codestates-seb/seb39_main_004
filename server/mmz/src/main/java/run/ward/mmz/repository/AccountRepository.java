package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import run.ward.mmz.domain.account.Account;

import javax.transaction.Transactional;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    @Query("SELECT u.refreshToken FROM Account u WHERE u.id=:id")
    String getRefreshTokenById(@Param("id") Long id);
    
    @Transactional
    @Modifying
    @Query("UPDATE Account u SET u.refreshToken=token WHERE u.id=:id")
    void updateRefreshToken(@Param("id") Long id, @Param("token") String token);


    Optional<Account> findByEmail(String email);
}
