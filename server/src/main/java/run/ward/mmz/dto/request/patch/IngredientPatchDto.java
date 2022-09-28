package run.ward.mmz.dto.request.patch;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IngredientPatchDto {

    private Long id;
    private int index;
    private String name;
    private String amount;
    @JsonProperty("isEssential")
    private boolean isEssential;
}
