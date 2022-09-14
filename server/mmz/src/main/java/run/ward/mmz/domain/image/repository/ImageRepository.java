package run.ward.mmz.domain.image.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import run.ward.mmz.domain.image.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}