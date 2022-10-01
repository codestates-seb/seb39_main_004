package run.ward.mmz;

import org.apache.catalina.SessionListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration;
import org.springframework.boot.context.ApplicationPidFileWriter;


@SpringBootApplication(
        exclude = {
                MultipartAutoConfiguration.class //
        }
)
public class MmzApplication {

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(MmzApplication.class);
        application.addListeners(new ApplicationPidFileWriter());
        application.run(args);
    }




}
