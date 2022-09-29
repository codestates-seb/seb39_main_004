package run.ward.mmz.log;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum LogType {

    CONTROLLER("CONTROLLER"),
    SERVICE("SERVICE"),
    MAPPER("MAPPER"),
    DATABASE("DATABASE");

    private final String type;
}
