package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import run.ward.mmz.domain.account.Account;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    @Query("SELECT COUNT(a.name) > 0 " + "FROM Account a " + "WHERE a.name =:name")
    boolean existsByName(@Param("name")String name);

    Optional<Account> findByEmail(String email);

    Optional<Account> findByName(String name);
}