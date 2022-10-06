package run.ward.mmz.dto.respones;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class IngredientResponseDto {

    private int index;
    private String name;
    private String amount;
    @JsonProperty("isEssential")
    private boolean isEssential;
}
