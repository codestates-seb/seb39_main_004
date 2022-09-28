package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.file.Files;

public interface FileRepository extends JpaRepository<Files, Long> {
}