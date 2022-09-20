package run.ward.mmz.dto.post;

import java.io.Serializable;

public class IngredientDto {

    public static class Request{
        private int index;
        private String name;
        private String amount;
        private boolean isEssentialed;
    }

    public static class Response implements Serializable {
        private int index;
        private String name;
        private String amount;
    }

}
