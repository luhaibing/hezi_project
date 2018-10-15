package com.hezi_project.download.basic.callback;

import com.hezi_project.download.basic.DownLoadState;

public interface OnDownLoadCallBack {

    /**
     * 任务初始化
     *
     * @param url          网络资源定位符
     * @param fileSize     文件总大小
     * @param completeSize 已下载的数据量
     */
    void initialize(String url, int fileSize, int completeSize);

    /**
     * 下载开始
     *
     * @param url          网络资源定位符
     * @param completeSize 已经下载的数据量
     */
    void onStart(String url, int completeSize);

    /**
     * 下载停止
     *
     * @param url          网络资源定位符
     * @param completeSize 已经下载的数据量
     */
    void onPause(String url, int completeSize);

    /**
     * 某个线程某次下载的数据长度
     *
     * @param url          网络资源定位符
     * @param fileSize     文件总大小
     * @param completeSize 已下载的数据量
     */
    void onProgress(String url, int completeSize, int fileSize);

//    /**
//     * 因为一些原因需要先删除原有的文件
//     */
//    void onDelete(int flag);

    /**
     * 下载完成
     *
     * @param url      网络资源定位符
     * @param filePath 文件保存的路径
     */
    void onComplete(String url, String filePath);

    /**
     * 出现异常
     * @param url
     * @param e
     */
    void onError(String url,Exception e);

    /**
     * 下载器对象切换下载状态
     *
     * @param url      网络资源定位符
     * @param previous 上一个状态
     * @param current  当前状态
     */
    void toggleState(String url, DownLoadState previous, DownLoadState current);

}
