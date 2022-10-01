package run.ward.mmz.service.account;


import run.ward.mmz.domain.account.Account;

public interface AuthService {

    Account signUp(Account account);
    void resign(Account account);

}
