package run.ward.mmz.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Getter
@NoArgsConstructor
public class IngredientPostDto{

    private int index;
    private String name;
    private String amount;

    @JsonProperty("isEssential") // json object 상호 변환시 lombok으로 인한 boolean 기본형 오류로 데이터를 받아오지 못함.
    private boolean isEssential;
}
