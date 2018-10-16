/*
 * 个人中心
 */
import React, {
    Component,
} from 'react';
import {
    Platform,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,

} from 'react-native';
import screen from '../util/screen_util';
import draws from '../util/draws';
import routes from "../routes";
import Utils from "../util/utils";
import ChoiceDialog from "../widget/choice_dialog";
import ImagerPicker from "../widget/choice_photo";
import colors from "../util/colors";

// 性别
let sexList = [
    '男', '女', '其他',
];

class PersonalCenter extends Component {

    static  navigationOptions = {
        title: '个人中心',
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            showGenderDialog: false,
            genderSelect: -1,
            avatarSource: null,
        };
    }

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

                    {/* 渲染是否选择性别对话框 */}
                    {this.renderChoiceDialog()}
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
        let action = () => {
            ImagerPicker.selectPhotoTapped((response) => {
                let source = {uri: response.uri};
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source
                });
            })
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
                        source={this.state.avatarSource}
                        placeholder={require('../../image/placeholder.jpg')}
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
        let title = '昵称';
        let content = '盒子盒子11';
        let action = () => {
            Utils.alert('昵称');
        };
        return (
            <View
                style={styles.item_container}>
                <Text style={styles.item_title}>{title}</Text>
                <View style={styles.space}/>
                <TouchableOpacity
                    onPress={action}
                    style={styles.touchable_area}>
                    <TextInput
                        style={styles.item_content_text_input}
                        value={content}
                        onEndEditing={() => {
                            // TODO 待接入逻辑
                            Utils.alert("输入结束,通过网络修改昵称")
                        }}/>
                    <Image
                        style={styles.item_icon_more}
                        source={require('../../image/icon_more.png')}/>
                </TouchableOpacity>
            </View>
        )
    };


    /* 获取性别的文字显示 */
    getGenderText = () => {
        let {genderSelect} = this.state;
        switch (genderSelect) {
            case 0:
            case 1:
            case 2:
                return sexList[genderSelect];
            default:
            case -1:
                return "请选择";
        }
    };

    /* 性别 */
    renderGenderView = (data) => {
        return this.commonItemView('性别', this.getGenderText(), () => {
            this.toggleDialogVisiable(true);
        });
    };

    /* 密码 */
    renderPassWordView = (data) => {
        return this.commonItemView('密码', '未设置', () => {
            let {navigate} = this.props.navigation;
            navigate(routes[2].path)
        });
    };

    /* 手机号 */
    renderPhonedView = (data) => {
        return this.commonItemView('手机号', '13037158118', () => {
            let {navigate} = this.props.navigation;
            navigate(routes[3].path)
        });
    };

    /* 微信绑定 */
    renderWeiXinView = (data) => {
        return this.commonItemView('微信绑定', '未绑定', () => {
            Utils.alert('微信绑定');
        });
    };

    /* 2.微博绑定 */
    renderMaihoView = (data) => {
        return this.commonItemView('微博绑定', '狂人', () => {
            Utils.alert('狂人');
        }, false);
    };

    /* 我的等级 */
    renderLevelView = (data) => {
        return this.commonItemView('我的等级', 'Lv1', () => {
            Utils.alert('我的等级');
        });
    };

    /* 实名认证 */
    renderRealNameView = (data) => {
        return this.commonItemView('实名认证', '未认证', () => {
            let {navigate} = this.props.navigation;
            navigate(routes[6].path)
        });
    };


    //////////////////////////////////////////////////////

    /* 设置状态标记是否显示选择对话框 */
    toggleDialogVisiable = (visible: Boolean = false) => {
        this.setState({
            showGenderDialog: visible,
        })
    };

    /* 渲染选择性别的对话框 */
    renderChoiceDialog = () => {
        let {showGenderDialog} = this.state;
        if (!showGenderDialog) {
            return null;
        }
        let {genderSelect} = this.state;
        return (
            <ChoiceDialog
                data={sexList}
                toggleVisiable={this.toggleDialogVisiable}
                setSelect={this.setSelect}
                select={genderSelect}/>
        );
    };

    /* 设置选择的证件类型 */
    setSelect = ({item, index}) => {
        this.toggleDialogVisiable(false);
        this.setState({
            genderSelect: index,
        });
    }

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
        // marginTop: (Platform.OS === 'ios' ? 20 : 0),
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
        color: colors.grey_2b,
        marginLeft: 18,
    },

    /* 每项的内容 */
    item_content: {
        fontSize: 14,
        color: colors.grey_66,
    },
    item_content_text_input: {
        fontSize: 14,
        color: colors.grey_66,
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