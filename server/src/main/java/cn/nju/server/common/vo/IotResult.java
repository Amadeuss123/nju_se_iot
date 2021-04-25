package cn.nju.server.common.vo;

public class IotResult {
    private Integer code;

    private Object data;

    private String msg;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public IotResult() {
    }

    public IotResult(Integer code, Object data, String msg) {
        this.code = code;
        this.data = data;
        this.msg = msg;
    }

    public static IotResult success(Object data) {
        return new IotResult(200,data,"success");
    }

    public static IotResult failure(String msg) {
        return new IotResult(400,null,msg);
    }
}
