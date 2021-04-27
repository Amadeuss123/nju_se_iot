package cn.nju.server;

import org.junit.jupiter.api.Test;

import java.util.UUID;

public class UUIDTest {
    @Test
    public void test() {
        System.out.println(UUID.randomUUID().toString().substring(0,6));
    }
}
