/**
 * 修改密码
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
import draws from "../draws";
import {
    /* 标题颜色 */
    grey_2b as titleColor,
    /* 内容颜色 */
    grey_66 as contentColor,
    /* 提示颜色 */
    grey_d8 as hintColor,
    grey_ec,
} from "../../colos";
import Util from '../util/utils';

class ChangePassWord extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            phone: "",  // 手机号
            verification_code: "",// 验证码
            password: "",// 新密码
            verifi_password: "",// 验证新密码
        };
    }

    /* 渲染视图 */
    render() {
        let data = null;
        return (
            <View style={styles.container}>
                {screen.renderHeaderTitleView(this, "修改密码", (
                    <TouchableOpacity
                        onPress={this.saveChange}>
                        <Text
                            style={{
                                fontSize: 15, color: titleColor,
                                marginRight: 15,
                            }}
                        > 确定</Text>
                    </TouchableOpacity>
                ))}
                {draws.drawDivider()}
                {this.renderPhoneNumber(data)}
                {this.renderVerificationCodeView(data)}
                {this.renderInputPassWordView(data)}
                {this.renderInputPassWordView(data, true)}
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

    /*  */
    /**
     * 验证码视图
     * @param data
     * @param flag  标记是否为新旧手机号[true:新手机号, false:旧手机号]
     * @returns {*}
     */
    renderVerificationCodeView = (data, flag = false) => {
        return (
            <View style={{
                width: screen.width,
                height: 50,
                paddingLeft: 18,
                paddingRight: 18,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Text style={{
                    width: 68,
                    height: 20,
                    fontSize: 16,
                    color: titleColor,
                    // backgroundColor: '#ffffff',
                }}>验证码</Text>

                <View
                    style={{
                        flex: 1,
                        height: 48,
                        // backgroundColor: '#fa8c35',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            ref='verification_code'
                            placeholder='请输入验证码'
                            style={{
                                flex: 1,
                                hintColor: hintColor,
                            }}
                            onChangeText={(txt) => {
                                this.saveVerificationCode(txt, false);
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                            }}
                            onPress={() => {
                                this.getVerificationCodeByNetWork();
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
     * 输入新密码和确认密码视图
     * @param data
     * @param flag [false:数据密码; true]
     * @returns {*}
     */
    renderInputPassWordView = (data, flag: Boolean = false) => {
        return (
            <View style={{
                width: screen.width,
                height: 50,
                // flex: 1,
                // backgroundColor: '#ff4777',
                paddingLeft: 18,
                paddingRight: 18,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Text style={{
                    width: 68,
                    height: 20,
                    fontSize: 16,
                    color: titleColor,
                    // backgroundColor: '#ffffff',
                }}>{flag ? '确认密码' : '新密码'}</Text>

                <View
                    style={{
                        flex: 1,
                        height: 48,
                        // backgroundColor: '#fa8c35',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            ref='verification_code'
                            maxLength={20}
                            placeholder={flag ? '请再次输入新密码' : '请输入新密码'}
                            style={{
                                flex: 1,
                                hintColor: hintColor,
                            }}
                            secureTextEntry={true}
                            onChangeText={(txt) => {
                                this.savePassWord(txt, flag);
                            }}
                        />
                    </View>
                    {draws.drawDivider(screen.divider, screen - 68 - 30)}
                </View>
            </View>
        );
    };

    /* 保存手机号 */
    savePhoneNumber(input) {
        this.state.phone = input.toString();
    }

    /* 保存验证码 */
    saveVerificationCode(input) {
        this.state.verification_code = input;
    }

    /**
     * 保存密码
     * @param input 输入
     * @param flag [false:新输入,true:验证输入]
     */
    savePassWord(input, flag: Boolean) {
        if (flag) {
            this.state.verifi_password = input;
        } else {
            this.state.password = input;
        }
    }

    /**
     * 通过网络向手机发送验证码
     */
    getVerificationCodeByNetWork = () => {
        let phone = this.state.phone;
        Util.alert(`向${phone}发送验证码.`)
    };
    /**
     * 通过网络修改保存的数据
     */
    saveChange = () => {
        let verificationCode = this.state.verification_code;
        if (!Util.isValuable(verificationCode)) {
            Util.alert("请填写验证码");
            return;
        }

        let password = this.state.password;
        if (!Util.isValuable(password)) {
            Util.alert("请填写密码");
            return;
        }
        let verifiPassword = this.state.verifi_password;
        if (!Util.isValuable(verifiPassword)) {
            Util.alert("请填写验证密码");
            return;
        }

        let down = 4, up = 20;
        if (!Util.checkValueLength(password, down, up)) {
            Util.alert(`1请控制密码长度为${down}到${up}之间`);
            return;
        }
        if (!Util.checkValueLength(verifiPassword, down, up)) {
            Util.alert(`2请控制密码长度为${down}到${up}之间`);
            return;
        }
        if (Util.isEqual(password, verifiPassword)) {
            /* 通过网络修改密码 */
            Util.alert("验证成功,进行网络修改");
        } else {
            Util.alert("请验证密码")
        }
    };

    // /**
    //  * 获取存储验证码
    //  * @param input
    //  * @param flag 标记是否为新旧手机号[true:新手机号, false:旧手机号]
    //  */
    // saveVerificationCode = (input, flag: boolean) => {
    //     let state;
    //     if (flag) {
    //         // state = {new_verification_code: input};
    //     } else {
    //         // state = {old_verification_code: input};
    //     }
    //     this.setState(state);
    // };
    //
    // /**
    //  * 获取存储手机号
    //  * @param input
    //  * @param flag 标记是否为新旧手机号[true:新手机号, false:旧手机号]
    //  */
    // savePhone = (input, flag: boolean = false) => {
    //     let state;
    //     if (flag) {
    //         // state = {new_phone: input};
    //         // this.setState({new_phone: input});
    //     } else {
    //         // state = {old_phone: input};
    //         // this.setState({old_phone: input});
    //     }
    //     // this.setState({new_phone: input});
    // };
    //
    // /* 事件触发部分 */
    // /**
    //  * 通过网络获取验证码
    //  * @param flag 标记是否为新旧手机号[true:新手机号, false:旧手机号]
    //  */
    // getVerificationCodeByNetWork = (flag: boolean = false) => {
    //     // let msg;
    //     // if (flag) {
    //     //     msg = "新手机" + this.state.new_phone;
    //     // } else {
    //     //     msg = "旧手机" + this.state.old_phone;
    //     // }
    //
    //     let b = isPoneAvailable(flag?this.state.new_phone:this.state.old_phone);
    //
    //     Alert.alert('是否为手机 : ' + b);
    // };


}

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
    header_view_title: {
        color: titleColor,
        fontSize: 17,
    },
    item_phone: {
        marginTop: 54,
        marginBottom: 16,
        fontSize: 15,
        color: contentColor,
    },
    getVerification_text: {
        fontSize: 15,
        color: '#FF2E2A',
    }
});

export default ChangePassWord;
