package run.ward.mmz.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.dto.AccountDto;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AccountMapper {
    Account accountPostToAccount(AccountDto.Post requestBody);
    Account accountPatchToAccount(AccountDto.Patch requestBody);
    AccountDto.Response accountToAccountResponse(Account account);
    List<AccountDto.Response> accountsToAccountResponses(List<Account> accounts);
}
