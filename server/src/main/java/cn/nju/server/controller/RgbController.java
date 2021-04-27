package cn.nju.server.controller;

import cn.nju.server.common.entity.Rgb;
import cn.nju.server.common.vo.IotResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rgb")
public class RgbController {

    @RequestMapping("/change")
    public IotResult change(@RequestBody Rgb rgb) {
        return IotResult.success(rgb);
    }
}
