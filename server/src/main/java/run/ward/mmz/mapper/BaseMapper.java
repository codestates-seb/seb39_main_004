package run.ward.mmz.mapper;

import java.util.Set;

public interface BaseMapper<E, S, Q> {

    E toEntity(Q q);
    S toResponse(E e);

    Set<E> toEntity(Set<Q> q);
    Set<S> toResponse(Set<E> e);

}
