package run.ward.mmz.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder encodePassword() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        //csrf 토큰 비활성화
        http
                .csrf().disable();

        //접근을 전부 허용 @PreAuthorize("hasRole('ROLE_USER')") 사용 예정
        http
                .authorizeRequests()
                .anyRequest()
                .permitAll();


        //일반 로그인 관련 인증
        http
                .httpBasic()//postman 요청 임시
                    .and()
                .formLogin()
                    .loginProcessingUrl("/api/v1/auth/login")
                    .defaultSuccessUrl("/api/v1/main")
                    .failureUrl("/api/v1/auth/login-error")
                    .and()
                .logout()
                    .logoutUrl("/api/v1/logout")
                    .logoutSuccessUrl("/api/v1/main")
                .deleteCookies("JSESSIONID");


        http

                .headers()//h2 사용 위한 임시 frameOption sameOrigin
                .frameOptions()
                .sameOrigin();

        http
                .cors()
                .configurationSource(corsConfigurationSource());



        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin(CorsConfiguration.ALL);
        configuration.addAllowedHeader(CorsConfiguration.ALL);
        configuration.addAllowedMethod(CorsConfiguration.ALL);
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
