package run.ward.mmz.service;

import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;

public interface AccountService {

    Account findById(Long id);
    void verifyExistsId(Long id);
    Account findVerifiedEntity(Long id);
}
