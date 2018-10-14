/**
 * 帮助回去屏幕尺寸
 */
import {
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet, Platform,
} from 'react-native';
import {grey_2b as titleColor, grey_ec} from '../../colos';
import React from "react";
import Util from './utils';

const {width, height} = Dimensions.get('window');

let _styles = StyleSheet.create({
    /* 顶部视图的父容器 */
    header_view_container: {
        height: 45,
        width: width,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: (Platform.OS === 'ios' ? 20 : 0),
    },
    /* 顶部返回图标 */
    back_icon: {
        height: 20,
        width: 20,
        marginLeft: 16.3,
    },
    /* 顶部居中的标题文字 */
    header_view_title: {
        color: titleColor,
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

const screen = {
    width,
    height,
    divider: 1,
    dividerColor: grey_ec,
    renderHeaderTitleView,
};

export default screen;