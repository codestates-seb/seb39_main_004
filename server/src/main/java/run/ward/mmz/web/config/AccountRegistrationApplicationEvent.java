package run.ward.mmz.web.config;


import lombok.Getter;
import run.ward.mmz.domain.account.Account;

@Getter
public class AccountRegistrationApplicationEvent {
    private Account account;
    public AccountRegistrationApplicationEvent(Account account) {
        this.account = account;
    }
}
