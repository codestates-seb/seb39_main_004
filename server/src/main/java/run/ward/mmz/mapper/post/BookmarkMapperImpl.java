package run.ward.mmz.mapper.post;

import run.ward.mmz.domain.post.bookmark.Bookmark;
import run.ward.mmz.dto.post.BookmarkDto;
import run.ward.mmz.mapper.BaseMapper;

import java.util.Set;

public class BookmarkMapperImpl implements BookmarkMapper {


    @Override
    public Bookmark toEntity(BookmarkDto.Request request) {


    }

    @Override
    public BookmarkDto.Response toResponse(Bookmark bookmark) {
        return null;
    }

    @Override
    public Set<Bookmark> toEntity(Set<BookmarkDto.Request> q) {
        return null;
    }

    @Override
    public Set<BookmarkDto.Response> toResponse(Set<Bookmark> e) {
        return null;
    }
}
