package cn.nju.server;

import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Test;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;

public class FileTest {
    @Test
    public void createFile() throws IOException {
        float newBeam = 34F;
        File file = ResourceUtils.getFile("classpath:rules/sensorLight-beam-rule.drl");
        String content = FileUtils.readFileToString(file, StandardCharsets.UTF_8);
        System.out.println(content);
        System.out.println(replaceContent(newBeam, content));

    }
    //beam  sound
    private String replaceContent(float beam, String content){
        String[] lines = content.split("\\r?\\n");
        for(int i = 0; i < lines.length; i++){
            if(lines[i].trim().startsWith("$protocol")){
                int end = lines[i].indexOf('>');
                lines[i] = lines[i].substring(0, end + 1) + " "+ beam + ")";
            }
        }
        StringBuilder sb = new StringBuilder();
        for(String s : lines){
            sb.append(s).append("\n");
        }
        return sb.toString();
    }


}
