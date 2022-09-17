package run.ward.mmz.log;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.net.InetAddress;
import java.net.UnknownHostException;

@Aspect
@Component
public class AspectELK {


    private static final String TIMESTAMP_FORMAT = "yyyy-MM-dd HH:mm:ss";
    private static final Logger log = LoggerFactory.getLogger("ELK_LOGGER");
    private ObjectMapper mapper = new ObjectMapper();
    private String host = "";
    private String ip = "";
    private String clientIp = "";
    private String clientUrl = "";

    //요청 아이디 추가

    @PostConstruct
    public void init() throws UnknownHostException {
        InetAddress addr = InetAddress.getLocalHost();
        this.host = addr.getHostName();
        this.ip = addr.getHostAddress();
    }



}
