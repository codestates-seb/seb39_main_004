package run.ward.mmz.domain.account;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;

@Setter
@Getter
@MappedSuperclass
public class BaseEntity {
    @Column(updatable = false)
    private LocalDateTime created_at;
    private LocalDateTime updated_at;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        created_at = now;
        updated_at = now;
    }

    @PreUpdate
    public void preUpdate() {
        updated_at = LocalDateTime.now();
    }
}