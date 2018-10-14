import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';

import DownLoad from '../util/download';

class DownLoadButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            progress: -1,
            loadState: 0,
        };
    }

    /**
     * 注册使用到的监听回调
     */
    componentWillMount() {
        DeviceEventEmitter.addListener(DownLoad.startEvent, this.onStartEventListener);
        DeviceEventEmitter.addListener(DownLoad.progressEvent, this.onProgressEventListener);
        DeviceEventEmitter.addListener(DownLoad.pauseEvent, this.onPauseEventListener);
        DeviceEventEmitter.addListener(DownLoad.completeEvent, this.onCompleteEventListener);
        DeviceEventEmitter.addListener(DownLoad.toggleEvent, this.onToggleEventListener)
    }

    /**
     * 移除使用到的监听回调
     */
    componentWillUnmount() {
        // 暂停所有
        DownLoad.pauseAll();
        DeviceEventEmitter.removeListener(DownLoad.startEvent, this.onStartEventListener);
        DeviceEventEmitter.removeListener(DownLoad.progressEvent, this.onProgressEventListener);
        DeviceEventEmitter.removeListener(DownLoad.pauseEvent, this.onPauseEventListener);
        DeviceEventEmitter.removeListener(DownLoad.completeEvent, this.onCompleteEventListener);
        DeviceEventEmitter.removeListener(DownLoad.toggleEvent, this.onToggleEventListener);
    }

    //////////////////// 监听回调 函数 ///////////////////

    /* 下载开始 */
    onStartEventListener = ({url, completeSize}) => {
        // TODO 猜测应该也可以通过注册监听器的时候动态配置[eventType]进行区分
        if (this.props.url === url) {
            this.setState({
                text: "连接中",
            })
        }
    };

    /* 下载进度 */
    onProgressEventListener = ({url, completeSize, fileSize}) => {
        if (this.props.url === url) {
            let p = Math.floor((completeSize / fileSize) * 1000)/10;
            if (this.state.loadState === 2) {
                this.setState({
                    text: (p + "%"),
                    progress: p,
                })
            }
        }
    };

    /* 下载暂停 */
    onPauseEventListener = ({url, completeSize}) => {
        if (this.props.url === url) {
            this.setState({
                text: "已暂停",
            })
        }
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

    dispatchDownLoadEvent = () => {
        let state = this.state.loadState;
        if (state === 2 || state === 1) {
            DownLoad.pause(this.props.url);
        } else if (state === 4) {
            // 安装
            DownLoad.installApk(this.state.apkFilepath);
        } else {
            DownLoad.start(this.props.url);
        }
    }

}

export default DownLoadButton;