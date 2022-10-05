package run.ward.mmz.dto.respones;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "유저 정보 응답", title = "유저 정보 API JSON DATA 입니다.")
public class AccountInfoDto {
    @Schema(description = "유저 ID", example = "1")
    private Long userId;
    @Schema(description = "유저 닉네임", example = "ward")
    private String name;
    @Schema(description = "자기소개", example = "안녕하세요 김와드입니다.")
    private String bio;
    @Schema(description = "Email", example = "example@ward.com")
    private String email;
    @Schema(description = "유저 프로필 사진 경로", example = "profile.png")
    private String imgProfileUrl;
    @Schema(description = "팔로워 상태(로그인 되어있어야 활성화됨)", example = "true")
    private boolean isFollowed;
}
