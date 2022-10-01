package run.ward.mmz.mapper.account;

import run.ward.mmz.domain.account.Account;
import run.ward.mmz.dto.auth.OAuthAttributes;
import run.ward.mmz.dto.request.account.SignUpDto;
import run.ward.mmz.dto.respones.AccountInfoDto;

public interface AccountMapper {

    AccountInfoDto toInfoDto(Account account);
    Account toEntity(SignUpDto signUpDto);
    Account toEntity(OAuthAttributes oAuthAttributes);

}
