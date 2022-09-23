package run.ward.mmz.dto.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

public class IngredientDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request{
        private int index;
        private String name;
        private String amount;
        private boolean isEssentialed;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response implements Serializable {
        private int index;
        private String name;
        private String amount;
    }

}
