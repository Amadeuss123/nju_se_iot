package cn.nju.server.common.util;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class TokenUtils {
    private static Map<String, String> tokenMap = new HashMap<>(2);

    static {
        tokenMap.put("1","a5w1d3");
        tokenMap.put("2","g1e3y8");
        tokenMap.put("3","sajiod");
    }

    public static String generateToken(String id) {

        return  UUID.randomUUID().toString().substring(0,6);
    }
}
