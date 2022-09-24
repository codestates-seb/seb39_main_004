package run.ward.mmz.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CrudService<E, Q> {

    Page<E> search(String body, Pageable pageable);
    E save(Q q);
    E findById(Q q);
    void delete(Long id);
    E update(Long id, Q q);
    void verifyExistsId(Long id);
    E findVerifiedPost(Long id);

}
