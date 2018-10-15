package com.hezi_project.download.basic.callback;

import com.hezi_project.download.basic.DownLoadState;

/**
 * 回调接口的类适配器
 */
public class OnDownLoadCallBackAdapter implements OnDownLoadCallBack {

    @Override
    public void initialize(String url, int fileSize, int completeSize) {

    }

    @Override
    public void onStart(String url, int completeSize) {

    }

    @Override
    public void onPause(String url, int completeSize) {

    }

    @Override
    public void onProgress(String url, int completeSize, int fileSize) {

    }

    @Override
    public void onComplete(String url, String filePath) {

    }

    @Override
    public void onError(String url,Exception e) {

    }

    @Override
    public void toggleState(String url, DownLoadState previous, DownLoadState current) {

    }

}
