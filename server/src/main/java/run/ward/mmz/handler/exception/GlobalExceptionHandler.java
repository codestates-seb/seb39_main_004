package run.ward.mmz.handler.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.expression.spel.SpelEvaluationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.lang.reflect.UndeclaredThrowableException;


@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> customException(CustomException e) {
        ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    @ExceptionHandler(UndeclaredThrowableException.class)
    public ErrorResponse undeclaredThrowableException(UndeclaredThrowableException e) {

        log.info(e.getCause().toString());

        return ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());
    }


    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ErrorResponse httpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e) {

        log.info(e.getCause().toString());

        return ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ErrorResponse missingServletRequestParameterException(
            MissingServletRequestParameterException e) {

        log.info(e.getCause().toString());

        return ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());
    }


    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorResponse globalException(Exception e) {

        log.error("Exception : ", e);
        e.printStackTrace();
        System.out.println("e.getCause() = " + e.getCause());

        return ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e) {

        log.error("Exception : ", e);

        return new ResponseEntity<>(ErrorResponse.of(ExceptionCode.FILE_SIZE_EXCEED), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SpelEvaluationException.class)
    public ResponseEntity<ErrorResponse> spelEvaluationException(SpelEvaluationException e) {

        log.error("Exception : ", e);

        return new ResponseEntity<>(ErrorResponse.of(ExceptionCode.USER_UNAUTHORIZED), HttpStatus.UNAUTHORIZED);
    }


}
