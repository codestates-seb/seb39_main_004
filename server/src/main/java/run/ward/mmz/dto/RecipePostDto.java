package run.ward.mmz.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor
public class RecipePostDto implements Serializable {


    private String title;
    private String category;
    private String level;

    private List<IngredientPostDto> ingredients;
    private List<DirectionPostDto> directions;
    private List<RecipeTagPostDto> recipeTags;

}
