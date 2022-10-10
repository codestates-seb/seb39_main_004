package run.ward.mmz.repository.post;

import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.file.Files;

import java.util.Optional;

public interface FileRepository extends JpaRepository<Files, Long> {
    Optional<Files> findByFileName(String fileName);
}