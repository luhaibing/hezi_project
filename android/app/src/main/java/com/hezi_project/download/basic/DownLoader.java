package com.hezi_project.download.basic;

import android.content.Context;
import android.util.Log;

import com.hezi_project.download.basic.bean.DownloadInfo;
import com.hezi_project.download.basic.bean.LoadInfo;
import com.hezi_project.download.basic.callback.OnDownLoadCallBack;
import com.hezi_project.download.basic.callback.OnStateCallBack;
import com.hezi_project.download.basic.db.Dao;

import java.io.File;
import java.io.RandomAccessFile;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * 下载器
 */
@SuppressWarnings("WeakerAccess")
public class DownLoader implements OnStateCallBack {

    private String urlstr;// 下载的地址
    private String filePath;// 保存路径
    private int threadcount;// 线程数
    private OnDownLoadCallBack onDownLoadListener;
    private int fileSize;// 所要下载的文件的大小
    private Context context;

    /**
     * 下载状态
     */
    private DownLoadState loadState = DownLoadState.NONE;

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    private List<DownloadInfo> infos;// 存放下载信息类的集合
    private LoadInfo loadInfo;

    public DownLoader(String urlstr, String localfile, int threadcount
            , Context context, OnDownLoadCallBack onDownLoadListener) {
        this.urlstr = urlstr;
        this.filePath = localfile;
        this.threadcount = threadcount;
        this.onDownLoadListener = onDownLoadListener;
        this.context = context;
    }

    /**
     * 得到downloader里的信息
     * 首先进行判断是否是第一次下载，如果是第一次就要进行初始化，并将下载器的信息保存到数据库中
     * 如果不是第一次下载，那就要从数据库中读出之前下载的信息（起始位置，结束为止，文件大小等），并将下载信息返回给下载器
     */
    public LoadInfo getDownloaderInfors() {
        toggleState(DownLoadState.START);
        if (isFirst(urlstr)) {
            Log.v("TAG", "isFirst");
            init();
            int range = fileSize / threadcount;
            infos = new ArrayList<>();
            for (int i = 0; i < threadcount - 1; i++) {
                DownloadInfo info = new DownloadInfo(i, i * range, (i + 1) * range - 1, 0, urlstr);
                infos.add(info);
            }
            DownloadInfo info = new DownloadInfo(threadcount - 1, (threadcount - 1) * range,
                    fileSize - 1, 0, urlstr);
            infos.add(info);
            //保存infos中的数据到数据库
            Dao.getInstance(context).saveInfos(infos);
            //创建一个LoadInfo对象记载下载器的具体信息
            loadInfo = new LoadInfo(fileSize, 0, urlstr, filePath);

        } else {
            //得到数据库中已有的urlstr的下载器的具体信息
            infos = Dao.getInstance(context).getInfos(urlstr);
            Log.v("TAG", "not isFirst size=" + infos.size());
            int size = 0;
            int compeleteSize = 0;
            for (DownloadInfo info : infos) {
                compeleteSize += info.getCompeleteSize();
                size += info.getEndPos() - info.getStartPos() + 1;
            }
            loadInfo = new LoadInfo(size, compeleteSize, urlstr, filePath);
        }
        toggleState(DownLoadState.START);
        return loadInfo;
    }


    /**
     * 判断是否是第一次 下载
     */
    private boolean isFirst(String urlstr) {
        return Dao.getInstance(context).isHasInfors(urlstr);
    }

    /**
     * 初始化
     */
    @SuppressWarnings("ResultOfMethodCallIgnored")
    private void init() {
        try {
            URL url = new URL(urlstr);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setConnectTimeout(5000);
            connection.setRequestMethod("GET");
            fileSize = connection.getContentLength();
            // TODO: 2018/10/13
            File file = new File(filePath);
            if (!file.exists()) {
                file.createNewFile();
            }
            // 本地访问文件
            RandomAccessFile accessFile = new RandomAccessFile(file, "rwd");
            accessFile.setLength(fileSize);
            accessFile.close();
            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * 利用线程开始下载数据
     */
    public void download() {
        if (infos != null) {
            if (isDownLoading()) {
                return;
            }
            toggleState(DownLoadState.DOWNING);

            invokeListenerOnStart();

            // 开始下载
            for (DownloadInfo info : infos) {
                new DownLoadThread(
                        info.getThreadId(), info.getStartPos(), info.getEndPos(),
                        info.getCompeleteSize(), info.getUrl(), loadInfo.getFilePath()
                        , this).start();
            }
        }
    }

    /**
     * 切换状态
     *
     * @param state 即将切换的下载状态
     */
    private void toggleState(DownLoadState state) {
        DownLoadState lastState = this.loadState;
        this.loadState = state;
        if (checkListener()) {
            onDownLoadListener.toggleState(loadInfo.getUrl(), lastState, state);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    private void invokeListenerOnStart() {
        if (checkListener()) {
            onDownLoadListener.onStart(loadInfo.getUrl(), loadInfo.getCompleteSize());
        }
    }


    @Override
    public void updateProgress(String url, int length) {
        loadInfo.increaseComplete(length);
        if (checkListener()) {
            onDownLoadListener.onProgress(url, loadInfo.getCompleteSize(), loadInfo.getFileSize());
        }
    }

    @Override
    public boolean checkIsComplete(String urlstr, String filePath, int threadId) {
        boolean b = loadInfo.checkIsComplete();
        if (b) {
            invokeListenerOnComplete();
        }
        return b;
    }

    private void invokeListenerOnComplete() {
        if (checkListener()) {
            toggleState(DownLoadState.COMPLETE);
            onDownLoadListener.onComplete(loadInfo.getUrl(), loadInfo.getFilePath());
        }
        delete(loadInfo.getUrl());
    }

    /**
     * 删除数据库中urlstr对应的下载器信息
     *
     * @param urlstr 网络资源定位符
     */
    public void delete(String urlstr) {
        Dao.getInstance(context).delete(urlstr);
    }

    @Override
    public DownLoadState currentDownLoadState() {
        return loadState;
    }

    @Override
    public boolean isDownLoading() {
        return loadState == DownLoadState.DOWNING;
    }

    // resume
    @Override
    public boolean isStarted() {
        return loadState == DownLoadState.INIT || loadState == DownLoadState.START
                        || loadState == DownLoadState.DOWNING;
    }

    @Override
    public boolean isPause() {
        return loadState == DownLoadState.PAUSE;
    }

    @Override
    public Context getContext() {
        return context;
    }

    //////////////////////////////////////////////////////////////////

    private boolean checkListener() {
        return onDownLoadListener != null;
    }

    /**
     * 暂停
     */
    public void pause() {
        toggleState(DownLoadState.PAUSE);
        if (checkListener()) {
            onDownLoadListener.onPause(loadInfo.getUrl(), loadInfo.getCompleteSize());
        }
    }

}
