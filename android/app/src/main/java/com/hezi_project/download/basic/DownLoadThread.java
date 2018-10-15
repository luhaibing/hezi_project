package com.hezi_project.download.basic;

import android.support.annotation.NonNull;
import android.util.Log;

import com.hezi_project.Util;
import com.hezi_project.download.basic.callback.OnStateCallBack;
import com.hezi_project.download.basic.db.Dao;

import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * 文件的下载线程
 */
public class DownLoadThread extends Thread {

    // 网络连接超时时间
    private static final int CONNECT_TIMEOUT = 5000;

    private int threadId;//下载器线程id
    private int startPos;//开始点
    private int endPos;//结束点
    private int compeleteSize;//完成度
    private String urlstr;//下载器网络标识
    private String filePath;// 文件保存的路径
    private int contentLength;

    private OnStateCallBack mStateCallBack;

    public DownLoadThread(int threadId, int startPos, int endPos, int compeleteSize,
                          String url, String filePath,
                          @NonNull OnStateCallBack stateCallBack) {
        this.threadId = threadId;
        this.startPos = startPos;
        this.endPos = endPos;
        this.compeleteSize = compeleteSize;
        this.contentLength = endPos - startPos;
        this.urlstr = url;
        this.filePath = filePath;
        this.mStateCallBack = Util.chackNotNull(stateCallBack);
    }


    @Override
    public void run() {

        HttpURLConnection connection = null;
        RandomAccessFile randomAccessFile = null;
        InputStream is = null;
        try {
            // 根据地址路径获取一个URL 对象进行网络连接
            URL url = new URL(urlstr);
            connection = (HttpURLConnection) url.openConnection();
            connection.setConnectTimeout(5000);
            connection.setRequestMethod("GET");
            // 设置范围，格式为Range：bytes x-y;
            connection.setRequestProperty("Range", "bytes=" + (startPos + compeleteSize) + "-" + endPos);

            randomAccessFile = new RandomAccessFile(filePath, "rwd");
            randomAccessFile.seek(startPos + compeleteSize);
            // 将要下载的文件写到保存在保存路径下的文件中
            is = connection.getInputStream();
            byte[] buffer = new byte[4096];
            int length = -1;
            while ((length = is.read(buffer)) != -1) {
                randomAccessFile.write(buffer, 0, length);
                compeleteSize += length;

                updateProgress(urlstr, length);

                if (mStateCallBack.isPause()) {
                    return;
                }
            }

            checkIsComplete(threadId, compeleteSize);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (connection != null) connection.disconnect();
                if (randomAccessFile != null) randomAccessFile.close();
                if (is != null) is.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

    }

    /**
     * 调用回调的监听进度的方法
     *
     * @param urlstr 资源路径
     * @param length 当次写入的数据长度
     */
    private void updateProgress(String urlstr, int length) {

        try {
            // 更新数据库中的下载信息
            Dao.getInstance(mStateCallBack.getContext()).updataInfos(threadId, compeleteSize, urlstr);
        } catch (Exception e) {
            // e.printStackTrace();
            mStateCallBack.deliverException(urlstr, e);
        }
        mStateCallBack.updateProgress(urlstr, length);
    }

    /**
     * 线程任务如果已经下载完毕就通过回调去训完文件是否已下载完毕
     */
    private void checkIsComplete(int threadId, int compeleteSize) {
        mStateCallBack.checkIsComplete(urlstr, filePath, threadId);
    }

}