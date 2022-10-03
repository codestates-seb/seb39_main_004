package run.ward.mmz.handler.auth;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomLoginFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        String uri = request.getHeader("Referer");
        if (uri != null && !uri.contains("/api/v1/auth/login")) {
            request.getSession().setAttribute("prevPage", uri);
        }

        throw new CustomException(ExceptionCode.LOGIN_FAILED);

    }
}
