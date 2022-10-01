package run.ward.mmz.handler.log;


import lombok.*;


@Getter
@Setter
@NoArgsConstructor
public class LogELK {

    String timestamp;
    String hostname;
    String hostIp;
    String clientIp;
    String clientUrl;
    String callFunction;
    String type;
    String parameter;

    @Builder
    public LogELK(String timestamp, String hostname, String hostIp, String clientIp, String clientUrl, String callFunction, String type, String parameter) {
        this.timestamp = timestamp;
        this.hostname = hostname;
        this.hostIp = hostIp;
        this.clientIp = clientIp;
        this.clientUrl = clientUrl;
        this.callFunction = callFunction;
        this.type = type;
        this.parameter = parameter;
    }
}
