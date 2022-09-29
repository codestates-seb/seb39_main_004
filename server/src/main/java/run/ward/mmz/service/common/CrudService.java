package run.ward.mmz.service.common;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CrudService<T>{

    List<T> saveAll(List<T> list);
    T save(T t);
    T findById(Long id);
    void deleteById(Long id);
    T update(Long id, T t);
    void verifyExistsId(Long id);
    T findVerifiedEntity(Long id);

}
