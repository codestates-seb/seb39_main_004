package run.ward.mmz.service.image;

import run.ward.mmz.domain.file.File;
import run.ward.mmz.service.FileService;

import java.util.List;

public interface ImageService extends FileService {


    File getFileUrl(Long fileId);
    List<File> getAllFileUrl();

}
