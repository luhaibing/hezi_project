import {
    Platform,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import screen from "./screen_util";
import React from "react";
import Util from "./utils";
import colors from './colors';

/**
 * 绘制统用的分隔线
 * @param height 分割线高度
 * @param width 分割线长度
 * @param color 分割线颜色
 * @returns {*}
 */
const drawDivider = function dividerView(
    height = screen.divider,
    width = screen.width,
    color = screen.dividerColor) {
    return (
        <View
            style={{
                width: width,
                height: height,
                backgroundColor: color,
            }}
        />
    );
};


let _styles = StyleSheet.create({
    /* 顶部视图的父容器 */
    header_view_container: {
        height: 45,
        width: screen.width,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: screen.verticalOffset,
    },
    /* 顶部返回图标 */
    back_icon: {
        height: 20,
        width: 20,
        marginLeft: 16.3,
    },
    /* 顶部居中的标题文字 */
    header_view_title: {
        color: colors.grey_2b,
        fontSize: 17,
    },
});

/**
 * 生成一个占位的透明的控件
 * @returns {*}
 */
function generatepPlaceHolderView() {
    return (<View style={[_styles.back_icon, {
        marginLeft: 0,
        marginRight: 16.3,
    }]}/>);
}

/**
 * 页面标题部分视图
 * @returns {*}
 */
function renderHeaderTitleView(obj, text, rightView: React.Component = null) {
    /* 解构获取返回方法的对象 */
    let {goBack} = obj.props.navigation;
    return (
        <View style={_styles.header_view_container}>
            <TouchableOpacity
                onPress={() =>
                    goBack()}>
                <Image
                    source={require('../../image/icon_return.png')}
                    style={_styles.back_icon}/>
            </TouchableOpacity>
            <Text style={_styles.header_view_title}>{text}</Text>
            {Util.isNullOrUndefined(rightView) ? rightView : generatepPlaceHolderView()}
        </View>
    );
}

const draws = {
    drawDivider,
    renderHeaderTitleView,
};

export default draws;