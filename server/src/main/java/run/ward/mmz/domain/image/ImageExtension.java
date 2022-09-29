package run.ward.mmz.domain.image;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum ImageExtension {


    PNG("png"),
    JPG("jpg"),
    JPEG("jpeg"),
    JPE("jpe"),
    JFIF("jfif"),
    GIF("gif"),
    TIF("tif"),
    TIFF("tiff"),
    HEIC("heic");

    public static final List<String> EXTENSIONS = Stream.of(ImageExtension.values())
            .map(Enum::name)
            .collect(Collectors.toList());

    private final String extension;

    ImageExtension(String extension) {
        this.extension = extension;
    }
}
