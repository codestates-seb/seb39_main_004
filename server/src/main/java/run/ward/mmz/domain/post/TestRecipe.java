package run.ward.mmz.domain.post;

import lombok.Getter;
import lombok.NoArgsConstructor;
import run.ward.mmz.domain.auditable.Auditable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@Getter
public class TestRecipe extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String body;
}
