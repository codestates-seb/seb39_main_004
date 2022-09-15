package run.ward.mmz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration;

@SpringBootApplication(
        exclude = {
                MultipartAutoConfiguration.class //
        }
)
public class MmzApplication {

    public static void main(String[] args) {
        SpringApplication.run(MmzApplication.class, args);
    }

}
