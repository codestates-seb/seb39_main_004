package run.ward.mmz.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import run.ward.mmz.handler.auth.LoginUser;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import java.awt.print.Pageable;
import static java.util.Collections.singleton;

@EnableWebMvc
@Configuration
public class SwqggerConfig extends WebMvcConfigurationSupport {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30)
                .useDefaultResponseMessages(false)
                .ignoredParameterTypes(LoginUser.class, AuthenticationPrincipal.class, Pageable.class)
                .produces(singleton("application/json"))
                .consumes(singleton("application/json"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("run.ward.mmz.web.controller"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("REST API - mmz.today")
                .description("오늘 뭐먹지의 REST API 문서입니다.")
                .version("v1.0")
                .build();
    }


}
