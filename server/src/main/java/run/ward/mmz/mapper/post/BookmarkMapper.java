package run.ward.mmz.mapper.post;

import run.ward.mmz.domain.post.bookmark.Bookmark;
import run.ward.mmz.dto.post.BookmarkDto;
import run.ward.mmz.mapper.BaseMapper;

import java.util.Set;

public interface BookmarkMapper
        extends BaseMapper<Bookmark, BookmarkDto.Response, BookmarkDto.Request> {

    @Override
    Bookmark toEntity(BookmarkDto.Request request);

    @Override
    BookmarkDto.Response toResponse(Bookmark bookmark);

    @Override
    Set<Bookmark> toEntity(Set<BookmarkDto.Request> q);

    @Override
    Set<BookmarkDto.Response> toResponse(Set<Bookmark> e);

}
