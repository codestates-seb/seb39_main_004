package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.file.File;

public interface FileRepository extends JpaRepository<File, Long> {
}