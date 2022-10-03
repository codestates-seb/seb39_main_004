package run.ward.mmz.service.account;

import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.dto.respones.AccountInfoDto;

import java.util.List;

public interface AccountService extends AuthService {

    Account findById(Long id);
    Account findByEmail(String email);
    void verifyExistsId(Long id);
    Account findVerifiedEntity(Long id);
    Account update(Account user, AccountInfoDto userInfoDto);
    Account updateImgProfile(Long id, Files imgProfile);

}
