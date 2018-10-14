package com.hezi_project.download.basic;

public enum DownLoadState {

    NONE(1, "NONE"),       // 默认[不可能得到]
    INIT(1 << 1, "INIT"),       // 初始化
    START(1 << 2, "START"),      // 已开始下载
    DOWNING(1 << 3, "DOWNING"),    // 下载中
    PAUSE(1 << 4, "PAUSE"),      // 已暂停
    COMPLETE(1 << 5, "COMPLETE"),      // 已暂停
    ERROR(1 << 6, "ERROR"),      //  出现错误
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
