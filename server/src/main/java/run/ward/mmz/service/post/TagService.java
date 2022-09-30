package run.ward.mmz.service.post;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import run.ward.mmz.domain.post.Tag;
import run.ward.mmz.service.common.CrudService;

import java.util.List;


public interface TagService{
    List<Tag> saveAll(List<Tag> tagList);
    Tag findByTagName(String tagName);

}
