package com.hezi_project.download;

import android.os.Environment;
import android.support.annotation.NonNull;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.hezi_project.Util;
import com.hezi_project.download.basic.DownLoadState;
import com.hezi_project.download.basic.DownLoader;
import com.hezi_project.download.basic.DownloadTask;
import com.hezi_project.download.basic.callback.OnDownLoadCallBack;
import com.hezi_project.download.basic.callback.OnDownLoadCallBackAdapter;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

@SuppressWarnings("unused")
public class DownLoadMoudle extends ReactContextBaseJavaModule {

    private static final String TAG = DownLoadMoudle.class.getSimpleName();

    /**
     * 原生模块的名字
     */
    private static final String MODULE_NAME = "DownLoad";

    /* react-native 代码回调的方法名 */

    // 开始下载
    private static final String INIT = "onInitEvent";
    private static final String START = "onStartEvent";
    private static final String PROGRESS = "onProgressEvent";
    private static final String PAUSE = "onPauseEvent";
    private static final String COMPLETE = "onCompleteEvent";
    private static final String ERROR = "onErrorEvent";
    private static final String TOGGLE = "onToggleEvent";

    private long lastOnClickTime;
    private Map<String, DownLoader> loaderMap = new HashMap<>();
    private Map<String, String> keyMap = new HashMap<>();

    private OnDownLoadCallBack onDownLoadCallBack = new OnDownLoadCallBackAdapter() {

        private String getKey(@NonNull String url) {
            String key = keyMap.get(url);
            return key != null ? key : "";
        }

        @Override
        public void onStart(String url, int completeSize) {
            super.onStart(url, completeSize);
            WritableMap map = Arguments.createMap();
            map.putString("url", url);
            map.putInt("completeSize", completeSize);
            // emitEvent(START, map);
            emitEvent(START + getKey(url), map);
        }

        @Override
        public void onPause(String url, int completeSize) {
            super.onPause(url, completeSize);
            WritableMap map = Arguments.createMap();
            map.putString("url", url);
            map.putInt("completeSize", completeSize);
            // emitEvent(PAUSE, map);
            emitEvent(PAUSE + getKey(url), map);
        }

        @Override
        public void onProgress(String url, int completeSize, int fileSize) {
            super.onProgress(url, completeSize, fileSize);
            if (isDiscardEvent()) {
                return;
            }
            WritableMap map = Arguments.createMap();
            map.putString("url", url);
            map.putInt("completeSize", completeSize);
            map.putInt("fileSize", fileSize);
            // emitEvent(PROGRESS, map);
            emitEvent(PROGRESS + getKey(url), map);
        }

        @Override
        public void onComplete(String url, String filePath) {
            super.onComplete(url, filePath);
            WritableMap map = Arguments.createMap();
            map.putString("url", url);
            map.putString("filePath", filePath);
            // emitEvent(COMPLETE, map);
            emitEvent(COMPLETE + getKey(url), map);
            loaderMap.remove(url);
            keyMap.remove(url);
            Log.e("TAG", "onComplete 2: ");
        }

        @Override
        public void toggleState(String url, DownLoadState previous, DownLoadState current) {
            super.toggleState(url, previous, current);
            WritableMap map = Arguments.createMap();
            map.putString("url", url);
            map.putInt("previousState", previous.getValue());
            map.putInt("currentState", current.getValue());
            // emitEvent(TOGGLE, map);
            emitEvent(TOGGLE + getKey(url), map);
        }

        @Override
        public void initialize(String url, int fileSize, int completeSize) {
            super.initialize(url, fileSize, completeSize);
            WritableMap map = Arguments.createMap();
            map.putString("url", url);
            // emitEvent(INIT, map);
            emitEvent(INIT + getKey(url), map);
        }

        @Override
        public void onError(String url, Exception e) {
            super.onError(url
                    ,e);
            WritableMap map = Arguments.createMap();
            map.putString("url", url);
            map.putString("error", e.toString());
            // emitEvent(ERROR, map);
            emitEvent(ERROR + getKey(url), map);
        }
    };

    /**
     * 向 react-native 发射事件
     *
     * @param eventName 事件名
     * @param data      事件携带的数据
     */
    private void emitEvent(String eventName, @Nullable Object data) {
        getReactApplicationContext().getJSModule(
                DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, data);
    }

    @SuppressWarnings("WeakerAccess")
    public DownLoadMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        HashMap<String, Object> hashMap = new HashMap<>();

        /* 事件名 */
        hashMap.put("initEvent", INIT);
        hashMap.put("startEvent", START);
        hashMap.put("progressEvent", PROGRESS);
        hashMap.put("pauseEvent", PAUSE);
        hashMap.put("completeEvent", COMPLETE);
        hashMap.put("errorEvent", ERROR);
        hashMap.put("toggleEvent", TOGGLE);

        /* 下载状态 */
        hashMap.put(DownLoadState.NONE.getName(), DownLoadState.NONE.getValue());
        hashMap.put(DownLoadState.INIT.getName(), DownLoadState.INIT.getValue());
        hashMap.put(DownLoadState.START.getName(), DownLoadState.START.getValue());
        hashMap.put(DownLoadState.DOWNING.getName(), DownLoadState.DOWNING.getValue());
        hashMap.put(DownLoadState.PAUSE.getName(), DownLoadState.PAUSE.getValue());
        hashMap.put(DownLoadState.COMPLETE.getName(), DownLoadState.COMPLETE.getValue());
        hashMap.put(DownLoadState.ERROR.getName(), DownLoadState.ERROR.getValue());

        return hashMap;
    }

    /**
     * 启动一个下载任务
     *
     * @param url 任务的地址
     * @param key 用于标记的键[应请确认都为唯一值]
     */
    @ReactMethod
    public void start(String url, String key) {
        Log.e(TAG, "start task.--> url : " + url);
        new DownloadTask(loaderMap, keyMap, Environment.getExternalStorageDirectory().getPath(),
                onDownLoadCallBack, getReactApplicationContext()).execute(url, key);
    }

    /**
     * 暂停一个指定的下载任务
     *
     * @param url 任务的地址
     * @param key 用于标记的键[应请确认都为唯一值]
     */
    @ReactMethod
    public void pause(String url, String key) {
        DownLoader downLoader = loaderMap.get(url);
        if (downLoader != null) {
            downLoader.pause();
            Log.e(TAG, "pause task.--> url : " + url);
        } else {
            Log.e(TAG, "No tasks to pause.--> url : " + url);

        }
    }

    @ReactMethod
    public void pauseAll() {
        for (DownLoader loader : loaderMap.values()) {
            if (loader != null) {
                loader.pause();
            }
        }
    }

    /**
     * 安装 apk
     *
     * @param apkFilePath apk路径
     */
    @ReactMethod
    public void installApk(String apkFilePath) {
        Util.installApk(getCurrentActivity(), apkFilePath);
    }

    private long getCurrentTime() {
        return System.currentTimeMillis();
    }

    /**
     * 是否抛弃该次事件
     */
    private boolean isDiscardEvent() {
        long currentTime = getCurrentTime();
        boolean b = Math.abs(currentTime - lastOnClickTime) > 500;
        if (b) {
            lastOnClickTime = currentTime;
        }
        return !b;
    }

}
