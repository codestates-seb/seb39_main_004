package run.ward.mmz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.image.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}