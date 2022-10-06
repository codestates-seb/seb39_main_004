package run.ward.mmz.web.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.Arrays;
import java.util.List;

import static java.util.Collections.singleton;

@Configuration
public class SwqggerConfig {

    private String url="https://localhost:8080";

    @Bean
    public OpenAPI openAPI(@Value("${server.version")String appVersion,
                           @Value("${server.app.active")String active) {

        Info info = new Info()
                .version(appVersion)
                .title("REST API - mmz.today")
                .description("오늘 뭐먹지의 REST API 문서입니다.")
                .termsOfService("http://swagger.io/terms")
                .contact(new Contact()
                        .name("ward")
                        .url("https://github.com/ItsWard")
                        .email("bonuswon@gmail.com"))
                .license(new License()
                        .name("Apache License Version 2.0")
                        .url("http://www.apache.org/licenses/LICENSE-2.0"));


        List<Server> servers = Arrays.asList(new Server().url(url).description("demo (" + active + ")"));

        SecurityScheme basicAuth = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP).scheme("basic");
        SecurityRequirement securityItem = new SecurityRequirement().addList("basicAuth");

        return new OpenAPI()
                .components(new Components().addSecuritySchemes("basicAuth", basicAuth))
                .addSecurityItem(securityItem)
                .info(info)
                .servers(servers);
    }


}
