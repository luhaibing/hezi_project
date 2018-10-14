package com.hezi_project.download.basic;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

import com.hezi_project.download.basic.bean.LoadInfo;
import com.hezi_project.download.basic.callback.OnDownLoadCallBack;

import java.util.Map;

/**
 * 创建下载任务和下载器
 * 可适应 RxJava2 进行替换
 */
public class DownloadTask extends AsyncTask<String, Void, LoadInfo> {

    private static final int COUNT_THREAD = 2;
    private static final String TAG = DownloadTask.class.getSimpleName();

    private Map<String, DownLoader> hashMap;
    // 同时开启的线程数
    private String parentPath;
    private OnDownLoadCallBack onDownLoadCallBack;
    @SuppressLint("StaticFieldLeak")
    private Context context;

    public DownloadTask(Map<String, DownLoader> hashMap, String parentPath,
                        OnDownLoadCallBack onDownLoadCallBack, Context context) {
        this.hashMap = hashMap;
        this.parentPath = parentPath;
        this.onDownLoadCallBack = onDownLoadCallBack;
        this.context = context;
    }

    /**
     * 构建一个下载器的对象
     *
     * @param params 任务参数
     * @return 任务结果
     */
    @Override
    protected LoadInfo doInBackground(String... params) {
        if (params.length != 1) {
            throw new IllegalArgumentException("文件路径有误");
        }
        String url = params[0];
        String fileName = parentPath + url.substring(url.lastIndexOf("/"));
        Log.e(TAG, "文件保存路径--  " + fileName);
        DownLoader loader = hashMap.get(url);
        if (loader == null) {
            loader = new DownLoader(url, fileName, COUNT_THREAD, context, onDownLoadCallBack);
            hashMap.put(url, loader);
        }
        if (loader.isStarted()) {
            return null;
        }
        // 得到下载信息类的个数组成集合
        return loader.getDownloaderInfors();
    }


    @Override
    protected void onPostExecute(LoadInfo loadInfo) {
        super.onPostExecute(loadInfo);
        if (loadInfo != null) {
            DownLoader downLoader = hashMap.get(loadInfo.getUrl());
            // 调用方法开始下载
            downLoader.download();
        }
    }

}
