package run.ward.mmz.handler.log;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LogELK {

    String timestamp;
    String hostname;
    String hostIp;
    String clientIp;
    String clientUrl;
    String callFunction;
    String type;
    String parameter;

}
