import {NativeModules} from 'react-native';
import Utils from "./utils";

const Loader = NativeModules.DownLoad;

/*
   DeviceEventEmitter.addListener(DownLoad.startEvent, this.onStartEventListener);
        DeviceEventEmitter.addListener(DownLoad.progressEvent, this.onProgressEventListener);
        DeviceEventEmitter.addListener(DownLoad.pauseEvent, this.onPauseEventListener);
        DeviceEventEmitter.addListener(DownLoad.completeEvent, this.onCompleteEventListener);
        DeviceEventEmitter.addListener(DownLoad.toggleEvent, this.onToggleEventListener);

 hashMap.put("initEvent", INIT);
        hashMap.put("startEvent", START);
        hashMap.put("progressEvent", PROGRESS);
        hashMap.put("pauseEvent", PAUSE);
        hashMap.put("completeEvent", COMPLETE);
        hashMap.put("errorEvent", ERROR);
        hashMap.put("toggleEvent", TOGGLE);

        /* 下载状态
hashMap.put(DownLoadState.NONE.getName(), DownLoadState.NONE.getValue());
hashMap.put(DownLoadState.INIT.getName(), DownLoadState.INIT.getValue());
hashMap.put(DownLoadState.START.getName(), DownLoadState.START.getValue());
hashMap.put(DownLoadState.DOWNING.getName(), DownLoadState.DOWNING.getValue());
hashMap.put(DownLoadState.PAUSE.getName(), DownLoadState.PAUSE.getValue());
hashMap.put(DownLoadState.COMPLETE.getName(), DownLoadState.COMPLETE.getValue());
hashMap.put(DownLoadState.ERROR.getName(), DownLoadState.ERROR.getValue());

 */

/* 模块的几个方法 */
let {
    start,
    pause,
    pauseAll,
    installApk
} = Loader;

/* 几个状态相关的方法名 */
let {
    initEvent,
    startEvent,
    progressEvent,
    pauseEvent,
    completeEvent,
    errorEvent,
    toggleEvent
} = Loader;

/* 状态常量 */
let {
    NONE,
    INIT,
    START,
    DOWNING,
    PAUSE,
    COMPLETE,
    ERROR,
} = Loader;


function wrapperEventTypeName(eventType, key) {
    return eventType + (Utils.isNullOrUndefined(key) ? key : '');
}

const DownLoad = {

    start,
    pause,
    pauseAll,
    installApk,

    initEvent,
    startEvent,
    progressEvent,
    pauseEvent,
    completeEvent,
    errorEvent,
    toggleEvent,
    wrapperEventTypeName,

    NONE,
    INIT,
    START,
    DOWNING,
    PAUSE,
    COMPLETE,
    ERROR,

};

export default DownLoad;