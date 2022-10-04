package run.ward.mmz.handler.auth;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
@AuthenticationPrincipal(expression = "#this == 'anonymousUser' ? null :  user") //로그인 하지 않는 회원도 사용할 수 있도록(@PreAuthorize 등록시에만 회원 처리)
public @interface LoginUser {
}
