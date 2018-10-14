package com.hezi_project.download.basic.callback;

import android.content.Context;

import com.hezi_project.download.basic.DownLoadState;

public interface OnStateCallBack {

    /**
     * 获取当前下载器的状态
     *
     * @return
     */
    DownLoadState currentDownLoadState();

    /**
     * 是否是下载中
     */
    boolean isDownLoading();

    /**
     * 是否是下载已开始了
     * [包括 INIT,START,DOWNING]
     */
    boolean isStarted();

    /**
     * 是否是下载已暂停
     */
    boolean isPause();

    /**
     * 更新进度值
     *
     * @param url    网络资源定位符
     * @param length 当次的数据写入文件的大小
     */
    void updateProgress(String url, int length);

    /**
     * 检查文件是否已经下载完成
     *
     * @param urlstr   文件的资源路径
     * @param filePath 文件的保存路径
     * @param threadId 线程 id
     * @return 检查结果
     */
    boolean checkIsComplete(String urlstr, String filePath, int threadId);

    /**
     * 获取操作数据库需要的参数
     */
    Context getContext();

}
