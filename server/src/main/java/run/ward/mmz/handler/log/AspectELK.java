package run.ward.mmz.handler.log;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

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

    @Around("bean(*Controller)")
    public Object controllerAroundLogging(ProceedingJoinPoint pjp) throws Throwable {

        String timeStamp = new SimpleDateFormat(TIMESTAMP_FORMAT).format(new Timestamp(System.currentTimeMillis()));
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        this.clientIp = getIp(request);
        this.clientUrl = request.getRequestURL().toString();
        String callFunction = pjp.getSignature().getDeclaringTypeName() + "." + pjp.getSignature().getName();

        LogELK logelk = LogELK.builder()
                .timestamp(timeStamp)
                .hostIp(ip)
                .hostname(host)
                .clientIp(clientIp)
                .clientUrl(clientUrl)
                .callFunction(callFunction)
                .type(LogType.CONTROLLER.getType())
                .parameter(mapper.writeValueAsString(request.getParameterMap()))
                .build();

        log.info("{}", mapper.writeValueAsString(logelk));

        Object result = pjp.proceed();

        timeStamp = new SimpleDateFormat(TIMESTAMP_FORMAT).format(new Timestamp(System.currentTimeMillis()));

        logelk.setTimestamp(timeStamp);
        logelk.setType("CONTROLLER_RES");
        logelk.setParameter(mapper.writeValueAsString(result));
        log.info("{}", mapper.writeValueAsString(logelk));

        return result;

    }

    @Before("bean(*ServiceImpl)")
    public void serviceBeforeLogging(JoinPoint pjp) throws Throwable {
        String timeStamp = new SimpleDateFormat(TIMESTAMP_FORMAT).format(new Timestamp(System.currentTimeMillis()));
        String callFunction = pjp.getSignature().getDeclaringTypeName() + "." + pjp.getSignature().getName();

        Object[] argNames = pjp.getArgs();

        LogELK logelk = new LogELK();
        logelk.setTimestamp(timeStamp);
        logelk.setHostname(host);
        logelk.setHostIp(ip);
        logelk.setClientIp(clientIp);
        logelk.setClientUrl(clientUrl);
        logelk.setCallFunction(callFunction);
        logelk.setType("SERVICE_REQ");
        logelk.setParameter(mapper.writeValueAsString(argNames));
        log.info("{}", mapper.writeValueAsString(logelk));
    }

    @AfterReturning(pointcut = "bean(*ServiceImpl)", returning = "retVal")
    public void serviceAfterReturningLogging(JoinPoint pjp, Object retVal) throws Throwable {
        String timeStamp = new SimpleDateFormat(TIMESTAMP_FORMAT).format(new Timestamp(System.currentTimeMillis()));
        String callFunction = pjp.getSignature().getDeclaringTypeName() + "." + pjp.getSignature().getName();

        LogELK logelk = new LogELK();
        logelk.setTimestamp(timeStamp);
        logelk.setHostname(host);
        logelk.setHostIp(ip);
        logelk.setClientIp(clientIp);
        logelk.setClientUrl(clientUrl);
        logelk.setCallFunction(callFunction);
        logelk.setType("SERVICE_RES");
        logelk.setParameter(mapper.writeValueAsString(retVal));
        log.info("{}", mapper.writeValueAsString(logelk));
    }




    public String getIp(HttpServletRequest request){
        String ip = request.getHeader("x-real-ip");
        return ip != null ? ip : request.getRemoteAddr();
    }

}
