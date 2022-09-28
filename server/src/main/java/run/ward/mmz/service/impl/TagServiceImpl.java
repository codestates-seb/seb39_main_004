package run.ward.mmz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import run.ward.mmz.domain.post.Tag;
import run.ward.mmz.repository.TagRepository;
import run.ward.mmz.service.TagService;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;


    @Transactional
    public List<Tag> saveAll(List<Tag> tagList) {

        List<Tag> tagSave = new ArrayList<>();

        for(Tag tag : tagList){
            if(findByTagName(tag.getName()) == null)
                tagSave.add(tagRepository.save(tag));
        }

        return tagSave;
    }


    @Transactional
    public Tag findByTagName(String tagName) {
        return tagRepository.findByName(tagName);
    }



}
