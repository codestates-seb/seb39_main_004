package run.ward.mmz.handler.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.lang.reflect.UndeclaredThrowableException;


@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UndeclaredThrowableException.class)
    public ErrorResponse undeclaredThrowableException(UndeclaredThrowableException e){

        log.info(e.getCause().toString());
        log.info(e.getUndeclaredThrowable().toString());
        log.info(e.getStackTrace().toString());

        return ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());
    }
}
