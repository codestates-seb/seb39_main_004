package run.ward.mmz.mapper;

import java.util.Set;

public interface BaseMapper<E, P, Q> {

    E toEntity(Q q);
    P toResponse(E e);

    Set<E> toEntity(Set<Q> q);
    Set<P> toResponse(Set<E> e);

}
