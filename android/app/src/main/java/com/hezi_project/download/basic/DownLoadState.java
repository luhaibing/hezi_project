package com.hezi_project.download.basic;

public enum DownLoadState {

    NONE(0, "NONE"),       // 默认[不可能得到]
    INIT(0, "INIT"),       // 初始化
    START(1, "START"),      // 已开始下载
    DOWNING(2, "DOWNING"),    // 下载中
    PAUSE(3, "PAUSE"),      // 已暂停
    COMPLETE(4, "COMPLETE"),      // 已暂停
    ERROR(5, "ERROR"),      //  出现错误
    ;

    private int value;
    private String name;

    DownLoadState(int value, String name) {
        this.value = value;
        this.name = name;
    }

    public int getValue() {
        return value;
    }

    public String getName() {
        return name;
    }

}
