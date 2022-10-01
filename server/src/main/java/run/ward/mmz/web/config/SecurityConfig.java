package run.ward.mmz.web.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2AuthorizationSuccessHandler;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import run.ward.mmz.handler.auth.LoginFailureHandler;
import run.ward.mmz.handler.auth.LoginSuccessHandler;
import run.ward.mmz.web.auth.OAuth2UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.io.IOException;
import java.util.Map;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2UserServiceImpl oAuth2UserService;
    private final LoginSuccessHandler loginSuccessHandler;
    private final LoginFailureHandler loginFailureHandler;

    @Bean
    public BCryptPasswordEncoder encodePassword() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        //csrf 토큰 비활성화
        http
                .csrf().disable()
        ;

        //접근을 전부 허용 @PreAuthorize("hasRole('ROLE_USER')") 사용 예정
        http
                .authorizeRequests()
                .anyRequest()
                .permitAll()
        ;


        //일반 로그인 관련 인증
        http
                .httpBasic()//postman 요청 임시
                .disable()
                .formLogin()
                .loginProcessingUrl("/api/v1/auth/login")
                .failureUrl("/api/v1/auth/login-error")
                .successHandler(loginSuccessHandler)
                .failureHandler(loginFailureHandler)
                .and()
                .logout()
                .logoutUrl("/api/v1/logout")
                .deleteCookies("JSESSIONID")
        ;

        http
                .oauth2Login()
                .successHandler(loginSuccessHandler)
                .failureHandler(loginFailureHandler)
                .userInfoEndpoint()
                .userService(oAuth2UserService);


        http

                .headers()//h2 사용 위한 임시 frameOption sameOrigin
                .frameOptions()
                .sameOrigin();

        http
                .cors()
//                .configurationSource(corsConfigurationSource())
        ;

        http
                .sessionManagement(
                        session -> session.sessionFixation(SessionManagementConfigurer.SessionFixationConfigurer::changeSessionId)
                                .maximumSessions(1)
                                .maxSessionsPreventsLogin(false)
                                .expiredUrl("/auth/login-page")
                )
        ;


        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:8080");
        configuration.addAllowedHeader(CorsConfiguration.ALL);
        configuration.addAllowedMethod(CorsConfiguration.ALL);
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class SessionListener implements HttpSessionListener {
        @Override
        public void sessionCreated(HttpSessionEvent se) {
            se.getSession().setMaxInactiveInterval(60 * 60 * 3);
            HttpSessionListener.super.sessionCreated(se);

        }

        @Override
        public void sessionDestroyed(HttpSessionEvent se) {
            HttpSessionListener.super.sessionDestroyed(se);
        }
    }


}
