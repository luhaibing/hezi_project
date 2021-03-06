/**
 * 修改手机号
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
} from 'react-native';
import screen from "../util/screen_util";
import draws from "../util/draws";
import Util from '../util/utils';
import colors from '../util/colors';

class ChangePhone extends Component {

    static navigationOptions = {
        header: null,
    };

    /* 构造函数 */
    constructor(props) {
        super(props);
        this.state = {
            phone: "",  // 旧手机号
            new_phone: "",  // 新手机号
            verification_code: "",// 验证码
            new_verification_code: "",// 验证码
        };
    }

    /* 渲染视图 */
    render() {
        let data = null;
        return (
            <View style={styles.container}>
                {draws.renderHeaderTitleView(this, "修改手机号", (
                    <TouchableOpacity
                        onPress={this.saveChange}>
                        <Text style={styles.submit_title}
                        > 确定</Text>
                    </TouchableOpacity>
                ))}
                {draws.drawDivider()}
                <Text style={styles.top_hint_title}>
                    验证即可登录，未注册用户根据手机号自动创建</Text>
                {draws.drawDivider()}

                {this.renderPhoneNumber(data)}
                {this.renderVerificationCodeView(data)}
                {this.renderInputPhoneView(data)}
                {this.renderVerificationCodeView(data, true)}
                <View style={{flex: 1}}/>
            </View>
        );
    }

    /* 渲染手机号码部分 */
    renderPhoneNumber = (date) => {
        /* 替换部分手机号为星号 */
        let phone = 15212312541;
        // this.savePhone('15212312541', false);
        let phoneStr = phone + "";
        const p = phoneStr.substr(0, 3) + "****" + phoneStr.substr(-4, 4);
        this.savePhoneNumber(phone);
        return (
            <Text style={styles.item_phone}>当前绑定手机号：{p}</Text>
        );
    };

    /**
     * 验证码视图
     * @param data
     * @param flag  标记是否为新旧手机号[true:新手机号, false:旧手机号]
     * @returns {*}
     */
    renderVerificationCodeView = (data, flag = false) => {
        return (
            <View style={styles.item_container_outside}>
                <Text style={styles.item_title}>验证码</Text>
                <View
                    style={styles.item_container_inside}>
                    <View style={styles.item_input_container}>
                        <TextInput
                            placeholderTextColor={colors.grey_d8}
                            placeholder={`请输入验证码`}
                            style={[styles.text_input,
                                {placeholderTextColor: colors.red_2a}
                            ]}
                            onChangeText={(txt) => {
                                this.saveVerificationCode(txt, flag);
                            }}
                        />
                        <TouchableOpacity
                            style={styles.seletCenter}
                            onPress={() => {
                                this.getVerificationCodeByNetWork(flag);
                            }}>
                            <Text
                                style={styles.getVerification_text}>
                                获取验证码</Text>
                        </TouchableOpacity>
                    </View>

                    {draws.drawDivider(screen.divider, screen - 68 - 30)}
                </View>

            </View>
        );
    };


    /**
     * 输入新手机的视图
     */
    renderInputPhoneView = () => {
        return (
            <View style={styles.item_container_outside}>
                <Text style={styles.item_title}>新手机号</Text>
                <View style={styles.item_container_inside}>
                    <View style={styles.item_input_container}>
                        <Text style={styles.phone_number_prefix}>+86</Text>
                        <TextInput
                            placeholderTextColor={colors.grey_d8}
                            placeholder='请输入手机号码'
                            style={[styles.text_input,
                                {placeholderTextColor: colors.red_2a}
                            ]}
                            onChangeText={(txt) => {
                                this.savePhoneNumber(txt, true);
                            }}
                        />
                    </View>
                    {draws.drawDivider(screen.divider, screen - 68 - 30)}
                </View>

            </View>
        );
    };


    /**
     * 保存手机号
     * @param input 输入
     * @param flag [false:旧手机号,true:新手机号]
     */
    savePhoneNumber(input, flag: Boolean = false) {
        if (flag) {
            this.state.new_phone = input;
        } else {
            this.state.phone = input;
        }
    }

    /**
     * 保存验证码
     * @param input 输入
     * @param flag [false:旧验证码,true:新验证码]
     */
    saveVerificationCode(input, flag: Boolean = false) {
        if (flag) {
            this.state.new_verification_code = input;
        } else {
            this.state.verification_code = input;
        }
    }

    /**
     * 通过网络向手机发送验证码
     * @param flag [false:旧手机号,true:新手机号]
     */
    getVerificationCodeByNetWork = (flag: Boolean = false) => {
        let phone = flag ? this.state.phone : this.state.new_phone;
        Util.alert(`向${flag ? '新手机号' : '旧手机号'} : ${phone}发送验证码.`)
    };

    /**
     * 通过网络修改保存的数据
     */
    saveChange = () => {

        let verificationCode = this.state.verification_code;
        if (!Util.isValuable(verificationCode)) {
            Util.alert("请填写已绑定的手机号的验证码");
            return;
        }

        let newVerificationCode = this.state.new_verification_code;
        if (!Util.isValuable(newVerificationCode)) {
            Util.alert("请填写新手机号的验证码");
            return;
        }

        if (Util.isEqual(verificationCode, newVerificationCode)) {
            /* 通过网络修改密码 */
            Util.alert("验证成功,进行网络修改");
        } else {
            Util.alert("请验证密码")
        }
    };

}

let ITEM_HEIGHT = 48;

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
    header_view_title: {
        color: colors.grey_2b,
        fontSize: 17,
    },
    item_phone: {
        marginTop: 20,
        marginBottom: 16,
        fontSize: 15,
        color: colors.grey_66,
    },
    getVerification_text: {
        fontSize: 15,
        color: '#FF2E2A',
    },
    /* 顶部提交按钮 */
    submit_title: {
        fontSize: 15,
        color: colors.grey_2b,
        marginRight: 15,
    },
    /* 顶部提示按钮 */
    top_hint_title: {
        height: 35,
        width: screen.width,
        textAlign: 'left',
        fontSize: 13,
        paddingTop: 8,
        paddingLeft: 16,
        backgroundColor: colors.grey_ec,
        color: colors.grey_66,
    },
    /* 每个横向的 item 容器的风格样式 */
    item_container_outside: {
        width: screen.width,
        height: 50,
        paddingLeft: 18,
        paddingRight: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_container_inside: {
        flex: 1,
        height: ITEM_HEIGHT,
    },
    /* 每个横向的 item 的标题的风格样式 */
    item_title: {
        width: 68,
        height: 20,
        fontSize: 16,
        marginRight: 13,
        color: colors.grey_2b,
    },
    /* 文字输入 */
    text_input: {
        flex: 1,
        // hintColor: colors.grey_d8,
        // placeholderTextColor: colors.grey_d8,
    },
    /* 文字输入框的直接外层 */
    item_input_container: {
        flexDirection: 'row',
        height: ITEM_HEIGHT - screen.divider
    },
    /* 自我居中 */
    seletCenter: {
        alignSelf: 'center',
    },
    phone_number_prefix:{
        width: 30,
        height: 16,
        fontSize: 15,
        alignSelf: 'center',
        marginRight:11,
    }
});

export default ChangePhone;

