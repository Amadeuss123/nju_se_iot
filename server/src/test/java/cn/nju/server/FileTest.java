package cn.nju.server;

import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Test;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class FileTest {
    @Test
    public void createFile() throws IOException {
        float newBean = 40F;
        File file = ResourceUtils.getFile("classpath:rules/sensorLight-beam-rule.drl");
        String content = FileUtils.readFileToString(file, StandardCharsets.UTF_8);
        System.out.println(content);
    }
}
