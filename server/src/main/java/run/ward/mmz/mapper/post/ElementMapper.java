package run.ward.mmz.mapper.post;

import java.util.List;

public interface ElementMapper<E, P>{

    E toEntity(P p);
    List<E> toEntity(List<P> p);
}
