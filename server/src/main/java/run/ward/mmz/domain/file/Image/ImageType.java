package run.ward.mmz.domain.file.Image;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum ImageType {


    PNG("png"),
    JPG("jpg"),
    JPEG("jpeg"),
    JPE("jpe"),
    JFIF("jfif"),
    GIF("gif"),
    TIF("tif"),
    TIFF("tiff"),
    HEIC("heic");

    public static final List<String> EXTENSIONS = Stream.of(ImageType.values())
            .map(Enum::name)
            .collect(Collectors.toList());

    private final String extension;

    ImageType(String extension) {
        this.extension = extension;
    }
}
