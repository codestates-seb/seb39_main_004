package run.ward.mmz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Getter
@NoArgsConstructor
public class IngredientPostDto implements Serializable {

    private int index;
    private String name;
    private String amount;
    private boolean isEssential;
}
