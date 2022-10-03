package run.ward.mmz.repository.account;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import run.ward.mmz.domain.account.Account;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    @Query("select count(a.name) > 0 " + "from Account a " + "where a.name =:name")
    boolean existsByName(@Param("name") String name);

    @Query("select count(a.email) > 0 " + "from Account a " + "where a.email =:email")
    boolean existsByEmail(@Param("email") String email);

    Optional<Account> findByEmail(String email);
    Optional<Account> findByName(String name);


}