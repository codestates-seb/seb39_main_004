package run.ward.mmz.service;

import run.ward.mmz.domain.file.File;

import java.util.List;

public interface ImageService extends FileService {


    File getFileUrl(Long fileId);
    List<File> getAllFileUrl();

}
