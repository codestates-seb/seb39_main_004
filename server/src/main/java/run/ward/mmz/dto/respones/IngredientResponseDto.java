package run.ward.mmz.dto.respones;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class IngredientResponseDto {

    private int index;
    private String name;
    private String amount;
    private boolean isEssential;
}
