package run.ward.mmz.dto.respones;

import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import lombok.*;
import org.springframework.data.domain.Page;
import run.ward.mmz.dto.common.PageInfo;
import run.ward.mmz.dto.common.ResponseDto;

import java.util.List;


@Getter
@NoArgsConstructor
public class UserPageDto<T> {

    private AccountInfoDto user;
    private int followerCount;
    private int followingCount;
    private List data;
    private PageInfo pageInfo;

    @Builder
    public UserPageDto(AccountInfoDto user, List data, Page page, int followerCount, int followingCount) {
        this.user = user;
        this.data = data;
        this.followerCount = followerCount;
        this.followingCount = followingCount;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
