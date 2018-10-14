/**
 * 实名认证
 */
import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {grey_2b as titleColor} from "../../colos";
import draws from "../util/draws";
import Utils from "../util/utils";
import colors from '../util/colors';
import screen from '../util/screen_util';
import UpLoadComponent from "../widget/upload_component";

class Authentication extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            certificate_type: 0,
            certificate_name: '',
            certificate_number: '',
        };
    }

    /* 渲染视图 */
    render() {
        return (
            <View style={styles.root_contianer}>
                {draws.renderHeaderTitleView(this, "实名认证", (
                    <TouchableOpacity
                        onPress={this.submitChange}>
                        <Text
                            style={{
                                fontSize: 15, color: titleColor,
                                marginRight: 15,
                            }}
                        >提交</Text>
                    </TouchableOpacity>
                ))}
                {/*{draws.drawDivider()}*/}
                <ScrollView style={{
                    // flex: 1,
                    // backgroundColor: screen.globalBackgroundColor,
                }}>
                    <Text style={styles.title_description}>
                        为了确保您的账号安全及正常使用，依据国家相关法律法规，
                        您需要填写实名资料，感谢您的理解和支持</Text>
                    {this.renderTypeOfCertificateView()}
                    {draws.drawDivider()}
                    {this.renderCertificateNameView()}
                    {draws.drawDivider()}
                    {this.renderCertificateNumberView()}
                    {draws.drawDivider(10)}
                    {this.renderCertificatePhotosView()}
                    {this.renderCertificatePhotoWithSelfView()}
                </ScrollView>
            </View>
        );
    }

    /* 渲染证件类型 */
    renderTypeOfCertificateView = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.choiceTypeOfCertificate();
                }}>
                <View style={styles.item_container}>
                    <Text style={styles.item_title}>证件类型</Text>
                    <View style={{
                        flex: 1,
                    }}/>
                    <Image
                        source={require('../../image/icon_more.png')}
                        style={{
                            width: 16,
                            height: 16,
                        }}/>
                </View>
            </TouchableOpacity>
        );
    };

    /* 渲染证件名和证件号 */
    renderCertificateNameAndNumberView = (text: String, onTextChangeListener) => {
        return (
            <View style={styles.item_container}>
                <Text style={styles.item_title}>{text}</Text>
                <TextInput
                    style={[styles.item_title, {flex: 1,}]}
                    onChangeText={onTextChangeListener}
                />
            </View>
        );
    };

    /* 渲染证件名 */
    renderCertificateNameView = () => {
        return (this.renderCertificateNameAndNumberView(
            "证件号码", (text) => {
                this.state.certificate_number = text;
            }))
    };

    /* 渲染证件号 */
    renderCertificateNumberView = () => {
        return (this.renderCertificateNameAndNumberView(
            "证件姓名", (text) => {
                this.state.certificate_name = text;
            }));
    };

    /* 渲染照片上传的按钮按钮 */
    renderPhotoButton = (text: String, action: Function) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    action();
                }}>
                <View style={{
                    width: PHOTO_WIDTH,
                    height: 155,
                    backgroundColor: colors.grey_f4,
                    borderRadius: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        source={require('../../image/icon_add_img.png')}
                        style={{
                            width: 35,
                            height: 35,
                        }}
                    />
                    <Text style={{
                        height: 21,
                        fontSize: 15,
                        marginTop: 20,
                        color: colors.grey_66,
                    }}>{text}</Text>
                    <Text style={{
                        height: 13,
                        fontSize: 9,
                        marginTop: 8,
                        color: colors.grey_90,
                    }}>支持jpeg、png,照片大小不超过2M</Text>
                </View>
            </TouchableOpacity>)
    };

    /* 渲染证件照片 */
    renderCertificatePhotosView = () => {
        return (
            <View>
                <Text style={{
                    fontSize: 15,
                    color: colors.grey_2b,
                    height: 21,
                    marginTop: 16,
                    marginLeft: 15,
                }}>身份证证件</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: (screen.width - 2 * PHOTO_WIDTH) / 3,
                    }}>
                    {this.renderPhotoButton('上传证件照正面', () => {
                        Utils.alert("选择证件照正面")
                    })}
                    {this.renderPhotoButton('上传证件照反面', () => {
                        Utils.alert("选择证件照反面")
                    })}
                </View>

            </View>);
    };

    /* 渲染手持身份证 */
    renderCertificatePhotoWithSelfView = () => {
        return (
            <View>
                <Text style={{
                    fontSize: 15,
                    color: colors.grey_2b,
                    height: 21,
                    marginTop: 16,
                    marginLeft: 15,
                }}>身份证证件</Text>

                <View
                    style={[{
                        flexDirection: 'row',
                        marginTop: 19,
                        marginLeft: 15,
                    }, {marginBottom: 21,}]}>
                    {this.renderPhotoButton('上传手持身份证照', () => {
                        Utils.alert("选择手持身份证照")
                    })}
                </View>
            </View>);
    };

    /* 向服务器提交信息 */
    submitChange = () => {
        Utils.alert("提交信息")
    };

    /* 证件类型 */
    choiceTypeOfCertificate = () => {
        Utils.alert("证件类型")
    };


}

let PHOTO_WIDTH = 160;

const styles = StyleSheet.create({
    root_contianer: {
        flex: 1,
        backgroundColor: screen.globalBackgroundColor,
    },
    // 说明
    title_description: {
        fontSize: 13,
        color: colors.red_2a,
        paddingLeft: 15,
        paddingTop: 12,
        paddingRight: 9,
        paddingBottom: 12,
        backgroundColor: colors.grey_ec,
    },
    item_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        height: 55,
        paddingLeft: 15,
        paddingRight: 15,
    },
    item_title: {
        fontSize: 15,
        color: colors.grey_2b,
    },
});

export default Authentication;