package run.ward.mmz.mapper.account;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.account.Role;
import run.ward.mmz.dto.auth.OAuthAttributes;
import run.ward.mmz.dto.request.account.SignUpDto;
import run.ward.mmz.dto.respones.AccountInfoDto;

import java.util.ArrayList;
import java.util.List;

@Component
public class AccountMapperImpl implements AccountMapper{

    String defaultProfileUrl = "default_thumbnail.png";

    @Override
    public List<AccountInfoDto> toInfoDto(List<Account> accountList) {

        if(accountList.isEmpty())
            return new ArrayList<>();

        List<AccountInfoDto> accountInfoDtoList = new ArrayList<>();

        for (Account account : accountList) {
            accountInfoDtoList.add(toInfoDto(account));
        }

        return accountInfoDtoList;
    }

    @Override
    public AccountInfoDto toInfoDto(Account account) {

        if (account == null) {
            return null;
        }

        return AccountInfoDto.builder()
                .userId(account.getId())
                .name(account.getName())
                .email(account.getEmail())
                .imgProfileUrl(account.getImgProfileUrl())
                .bio(account.getBio())
                .build();
    }

    @Override
    public Account toEntity(SignUpDto signUpDto) {

        if (signUpDto == null) {
            return null;
        }

        return Account.builder()
                .email(signUpDto.getEmail())
                .name(signUpDto.getName())
                .password(signUpDto.getPassword())
                .build();
    }

    @Override
    public Account toEntity(OAuthAttributes oAuthAttributes) {

        if (oAuthAttributes == null) {
            return null;
        }

        return Account.builder()
                .name(oAuthAttributes.getName())
                .email(oAuthAttributes.getEmail())
                .role(Role.USER)
                .provider(oAuthAttributes.getProvider())
                .imgProfileUrl(defaultProfileUrl)
                .build();
    }


}
