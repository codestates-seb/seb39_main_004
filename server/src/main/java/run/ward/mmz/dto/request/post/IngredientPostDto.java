package run.ward.mmz.dto.request.post;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IngredientPostDto{

    private int index;
    private String name;
    private String amount;

    @JsonProperty("isEssential") // json object 상호 변환시 lombok으로 인한 boolean 기본형 오류로 데이터를 받아오지 못함.
    private boolean isEssential;
}
