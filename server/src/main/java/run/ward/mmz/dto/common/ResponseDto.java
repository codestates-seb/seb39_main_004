package run.ward.mmz.dto.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

public class ResponseDto {


    @AllArgsConstructor
    @Getter
    public class Single<T> {
        private T data;
    }


    @AllArgsConstructor
    @Getter
    public static class Multi<T> {
        private List<T> data;
        private PageInfo pageInfo;

        public Multi(List<T> data, Page page) {
            this.data = data;
            this.pageInfo = new PageInfo(page.getNumber() + 1,
                    page.getSize(), page.getTotalElements(), page.getTotalPages());
        }


    }





}
