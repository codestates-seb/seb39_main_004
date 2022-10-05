package run.ward.mmz.service.account;


import run.ward.mmz.domain.account.Account;

public interface AuthService {

    Account save(Account user);
    Account signUp(Account user);
    void resign(Account user);

}
