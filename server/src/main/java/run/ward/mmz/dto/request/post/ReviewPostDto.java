package run.ward.mmz.dto.request.post;

import lombok.*;

import javax.persistence.Lob;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewPostDto {

    private String body;
    private int stars;

}
