package run.ward.mmz.mapper.account;

import org.springframework.stereotype.Component;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.account.Role;
import run.ward.mmz.dto.auth.OAuthAttributes;
import run.ward.mmz.dto.request.account.SignUpDto;
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
//                .imgProfileUrl(account.getImgProfile().getFileName())
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
                .build();
    }


}
