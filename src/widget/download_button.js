/**
 * 下载按钮组件
 * 需要设置[
 * text:下载任务开启前显示的文本信息
 * url:文件路径
 * keyValue:附加的标记(最好确定该值得唯一性)
 * ]
 *
 * eg :
 *
         <DownLoadButton
            style={style.button}
            text={'下载'}
            keyValue={index.toString()}
            url={item.path}/>
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';

import DownLoad from '../util/download';

let {
    initEvent,
    startEvent,
    progressEvent,
    pauseEvent,
    completeEvent,
    errorEvent,
    toggleEvent
} = DownLoad;

class DownLoadButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            progress: -1,
            loadState: DownLoad.NONE,
        };
    }

    /**
     * 注册使用到的监听回调
     */
    componentWillMount() {
        let {keyValue} = this.props;
        DeviceEventEmitter.addListener(DownLoad.wrapperEventTypeName(initEvent, keyValue), this.onInitEventListener);
        DeviceEventEmitter.addListener(DownLoad.wrapperEventTypeName(startEvent, keyValue), this.onStartEventListener);
        DeviceEventEmitter.addListener(DownLoad.wrapperEventTypeName(progressEvent, keyValue), this.onProgressEventListener);
        DeviceEventEmitter.addListener(DownLoad.wrapperEventTypeName(pauseEvent, keyValue), this.onPauseEventListener);
        DeviceEventEmitter.addListener(DownLoad.wrapperEventTypeName(completeEvent, keyValue), this.onCompleteEventListener);
        DeviceEventEmitter.addListener(DownLoad.wrapperEventTypeName(errorEvent, keyValue), this.onErrorEventListener);
        DeviceEventEmitter.addListener(DownLoad.wrapperEventTypeName(toggleEvent, keyValue), this.onToggleEventListener);
    }

    /**
     * 移除使用到的监听回调
     */
    componentWillUnmount() {
        // 暂停所有
        DownLoad.pauseAll();
        let {keyValue} = this.props;
        DeviceEventEmitter.removeListener(DownLoad.wrapperEventTypeName(initEvent, keyValue), this.onInitEventListener);
        DeviceEventEmitter.removeListener(DownLoad.wrapperEventTypeName(startEvent, keyValue), this.onStartEventListener);
        DeviceEventEmitter.removeListener(DownLoad.wrapperEventTypeName(progressEvent, keyValue), this.onProgressEventListener);
        DeviceEventEmitter.removeListener(DownLoad.wrapperEventTypeName(pauseEvent, keyValue), this.onPauseEventListener);
        DeviceEventEmitter.removeListener(DownLoad.wrapperEventTypeName(completeEvent, keyValue), this.onCompleteEventListener);
        DeviceEventEmitter.removeListener(DownLoad.wrapperEventTypeName(errorEvent, keyValue), this.onErrorEventListener);
        DeviceEventEmitter.removeListener(DownLoad.wrapperEventTypeName(toggleEvent, keyValue), this.onToggleEventListener);
    }

    //////////////////// 监听回调 函数 ///////////////////

    /* 初始化 */
    onInitEventListener = ({url}) => {
        this.setState({
            text: '初始化',
        })
    };

    /* 出现异常 */
    onErrorEventListener = ({url, error}) => {
        this.setState({
            text: '出现异常',
        })
    };

    /* 下载开始 */
    onStartEventListener = ({url, completeSize}) => {
        this.setState({
            text: "连接中",
        })
    };

    /* 下载进度 */
    onProgressEventListener = ({url, completeSize, fileSize}) => {
        let p = Math.floor((completeSize / fileSize) * 1000) / 10;
        if (this.state.loadState === DownLoad.DOWNING) {
            this.setState({
                text: (p + "%"),
                progress: p,
            })
        }
    };

    /* 下载暂停 */
    onPauseEventListener = ({url, completeSize}) => {
        this.setState({
            text: "已暂停",
        })
    };

    onCompleteEventListener = ({url, filePath}) => {
        if (this.props.url === url) {
            this.setState({
                text: "安装",
                apkFilepath: filePath,
            });
            DownLoad.installApk(filePath);
        }
    };

    /* 状态切换 */
    onToggleEventListener = ({url, previousState, currentState}) => {
        if (this.props.url === url) {
            this.setState({
                loadState: currentState,
            })
        }
    };

    ////////////////////

    /* 渲染视图 */
    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.dispatchDownLoadEvent();
                }}>
                <Text
                    {...this.props}
                    onPress={null}>{this.state.text}</Text>
            </TouchableOpacity>
        );
    }

    /**
     * 分发点击任务
     */
    dispatchDownLoadEvent = () => {
        let state = this.state.loadState;
        if (state === DownLoad.INIT || state === DownLoad.START || state === DownLoad.DOWNING) {
            DownLoad.pause(this.props.url, this.props.keyValue);
        } else if (state === 4) {
            // 安装
            DownLoad.installApk(this.state.apkFilepath);
        } else {
            DownLoad.start(this.props.url, this.props.keyValue);
        }
    }

}

export default DownLoadButton;