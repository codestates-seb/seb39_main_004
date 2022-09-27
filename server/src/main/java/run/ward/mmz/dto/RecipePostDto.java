package run.ward.mmz.dto;

import lombok.Data;
import lombok.Getter;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.*;

import java.util.ArrayList;
import java.util.List;


@Data
public class RecipePostDto {


    private String title;
    private Files imgThumbNail;
    private String category;
    private String level;

    private List<IngredientPostDto> ingredients;
    private List<DirectionPostDto> directions;
    private List<RecipeTagPostDto> recipeTags;

}
