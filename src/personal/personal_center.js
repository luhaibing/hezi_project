/*
 * 个人中心
 */
import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView, Platform,
} from 'react-native';
import {grey_2b as titleColor, grey_66 as contentColor} from '../../colos.json';
import screen from '../util/screen_util';
import draws from '../util/draws';
import routes from "../routes";

class PersonalCenter extends Component {

    static  navigationOptions = {
        title: '个人中心',
        header: null,
    };

    /**
     * 页面标题部分视图
     * @returns {*}
     */
    renderHeaderTitleView = () => {
        return
    };

    /* 渲染视图 */
    render() {

        let data = null;

        return (
            <View style={styles.container}>

                {draws.renderHeaderTitleView(this, "个人中心")}

                {draws.drawDivider()}

                <ScrollView>
                    {this.renderHeaderView(data)}

                    {draws.drawDivider()}

                    {this.renderNickNameView(data)}

                    {draws.drawDivider()}

                    {this.renderGenderView(data)}

                    {draws.drawDivider()}

                    {this.renderPassWordView(data)}

                    {draws.drawDivider(8)}

                    {this.renderPhonedView(data)}

                    {draws.drawDivider()}

                    {this.renderWeiXinView(data)}

                    {draws.drawDivider()}

                    {this.renderMaihoView(data)}

                    {draws.drawDivider(8)}

                    {this.renderLevelView(data)}

                    {draws.drawDivider(8)}

                    {this.renderRealNameView(data)}

                    {draws.drawDivider(8)}

                </ScrollView>

            </View>
        );
    }

    /**
     * 通用视图
     * @param title 标题
     * @param content 内容
     * @param action 点击的响应动作
     * @param is_show_more 是否显示更多的图标,默认显示
     */
    commonItemView = (title, content,
                      action = null,
                      is_show_more = true) => {
        if (title == null || content == null) {
            console.error('title or content can not be null.')
        }
        return (
            <View
                style={styles.item_container}>
                <Text style={styles.item_title}>{title}</Text>
                <View style={styles.space}/>
                <TouchableOpacity
                    onPress={action}
                    style={styles.touchable_area}>
                    <Text style={styles.item_content}>{content}</Text>

                    <Image
                        style={styles.item_icon_more}
                        source={is_show_more ? require('../../image/icon_more.png') : {}}/>

                </TouchableOpacity>
            </View>
        )
    };

    /* 1.头像 */
    renderHeaderView = (data) => {
        let title = '头像';
        let url = '../../image/placeholder.jpg';
        let action = () => {
            Alert.alert('头像');
        };
        return (
            <View
                style={styles.item_container}>
                <Text style={styles.item_title}>{title}</Text>
                <View style={styles.space}/>
                <TouchableOpacity
                    onPress={action}
                    style={styles.touchable_area}>

                    <Image
                        style={styles.item_icon_header}
                        resizeMode='cover'
                        source={require(url)}
                    />

                    <Image
                        style={styles.item_icon_more}
                        source={require('../../image/icon_more.png')}/>

                </TouchableOpacity>
            </View>
        )

    };

    /* 昵称 */
    renderNickNameView = (data) => {
        return this.commonItemView('昵称', "盒子盒子", () => {
            Alert.alert('昵称');
        });
    };

    /* 性别 */
    renderGenderView = (data) => {
        return this.commonItemView('性别', '请选择', () => {
            Alert.alert('性别');
        });
    };

    /* 密码 */
    renderPassWordView = (data) => {
        return this.commonItemView('密码', '未设置', () => {
            // Alert.alert('密码');
            let {navigate} = this.props.navigation;
            navigate(routes[2].path)
        });
    };

    /* 手机号 */
    renderPhonedView = (data) => {
        return this.commonItemView('手机号', '13037158118', () => {
            // Alert.alert('密码');
            let {navigate} = this.props.navigation;
            navigate(routes[3].path)
        });
    };

    /* 微信绑定 */
    renderWeiXinView = (data) => {
        return this.commonItemView('微信绑定', '未绑定', () => {
            Alert.alert('微信绑定');
        });
    };

    /* 2.微博绑定 */
    renderMaihoView = (data) => {
        return this.commonItemView('微博绑定', '狂人', () => {
            Alert.alert('狂人');
        }, false);
    };

    /* 我的等级 */
    renderLevelView = (data) => {
        return this.commonItemView('我的等级', 'Lv1', () => {
            Alert.alert('我的等级');
        });
    };

    /* 实名认证 */
    renderRealNameView = (data) => {
        return this.commonItemView('实名认证', '未认证', () => {
            Alert.alert('实名认证');
        });
    };

}

/* item 的高度 */
const ITEM_HEIGHT = 48;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    header_view_container: {
        height: 45,
        width: screen.width,
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

    /* 每项的容器 */
    item_container: {
        width: screen.width,
        height: ITEM_HEIGHT,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
    },

    /* 空白部分填充区域 */
    space: {
        flex: 1,
    },

    /* 每项的标题 */
    item_title: {
        fontSize: 15,
        color: titleColor,
        marginLeft: 18,
    },

    /* 每项的内容 */
    item_content: {
        fontSize: 14,
        color: contentColor,
    },

    /* item 中的响应点击区域 */
    touchable_area: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
    },

    /* 每项的末尾 的更多的图标 */
    item_icon_more: {
        width: 16,
        height: 16,
        marginRight: 11,
        marginLeft: 10
    },

    /* 头像项的图像*/
    item_icon_header: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
});

export default PersonalCenter;