package run.ward.mmz.service.post.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import run.ward.mmz.domain.post.Tag;
import run.ward.mmz.handler.exception.CustomException;
import run.ward.mmz.handler.exception.ExceptionCode;
import run.ward.mmz.repository.post.TagRepository;
import run.ward.mmz.service.post.TagService;

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
            if(!tagRepository.existsByName(tag.getName()))
                tagSave.add(tagRepository.save(tag));
        }

        return tagSave;
    }


    @Transactional
    public Tag findByTagName(String tagName) {

        if(!tagRepository.existsByName(tagName))
            throw new CustomException(ExceptionCode.TAG_NOT_FOUND);

        return tagRepository.findByName(tagName);
    }



}
