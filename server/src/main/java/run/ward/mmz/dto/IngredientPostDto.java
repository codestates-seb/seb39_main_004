package run.ward.mmz.dto;

import lombok.Getter;



@Getter
public class IngredientPostDto {

    private int index;
    private String name;
    private String amount;
    private boolean isEssential;
}
