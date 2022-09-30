package run.ward.mmz.service.account;

import run.ward.mmz.domain.account.Account;

public interface AccountService extends AuthService {

    Account findById(Long id);
    void verifyExistsId(Long id);
    Account findVerifiedEntity(Long id);

}
