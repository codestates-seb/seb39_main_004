package run.ward.mmz.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.Collection;
import java.util.List;

public class ResponseDto {


    @Data
    public static class Single<T> {
        private T data;

        @Builder
        public Single(T data) {
            this.data = data;
        }
    }


    @Data
    public static class Multi<T> {
        private List data;
        private PageInfo pageInfo;

        @Builder
        public Multi(List data, Page page) {
            this.data = data;
            this.pageInfo = new PageInfo(page.getNumber() + 1,
                    page.getSize(), page.getTotalElements(), page.getTotalPages());
        }


    }





}
