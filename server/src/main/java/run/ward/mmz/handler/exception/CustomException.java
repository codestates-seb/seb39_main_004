package run.ward.mmz.handler.exception;

import lombok.Getter;


@Getter
public class CustomException extends RuntimeException{

    private static final long serialVersionUID = 15495845L;

    private final ExceptionCode exceptionCode;

    public CustomException(ExceptionCode code) {
        super(code.getMessage());
        this.exceptionCode = code;
    }
}
