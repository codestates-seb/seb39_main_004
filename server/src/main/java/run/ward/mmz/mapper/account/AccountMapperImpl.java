package run.ward.mmz.mapper.account;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.dto.respones.AccountInfoDto;

@Component
public class AccountMapperImpl implements AccountMapper{

    @Override
    public AccountInfoDto toInfoDto(Account account) {

        if (account == null) {
            return null;
        }

        return AccountInfoDto.builder()
                .id(account.getId())
                .name(account.getName())
                .imgProfileUrl(account.getImgProfile().getFileName())
                .bio(account.getBio())
                .build();
    }
}
