package run.ward.mmz.mapper.post.common;

import java.util.List;

public interface RecipeElementMapper<E, Q, R> {

    E toEntity(Q q);
    List<E> toEntity(List<Q> qs);


    R toResponseDto(E e);
    List<R> toResponseDto(List<E> es);

}
