package run.ward.mmz.dto.request.post.patch;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
public class IngredientPatchDto {

    private int index;
    private String name;
    private String amount;
    @JsonProperty("isEssential")
    private boolean isEssential;
}
