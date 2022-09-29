package run.ward.mmz.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.account.Account;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByEmail(String email);
}
