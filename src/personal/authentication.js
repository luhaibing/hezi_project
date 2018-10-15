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
    FlatList,
    Alert,
    Modal,
} from 'react-native';
import draws from "../util/draws";
import Utils from "../util/utils";
import colors from '../util/colors';
import screen from '../util/screen_util';
import ChoiceDialog from "../widget/choice_dialog";
import ImagerPicker from "../widget/choice_photo";

/* 证件类型 */
let types = [
    '身份证', '港澳通行证', '驾驶证'
];

/**
 * 字段名
 * @type {string[]}
 */
let filedName = [
    'positive', 'Negative', 'person'
];

class Authentication extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            certificate_typeText: '',   // 证件类型文字
            certificate_type: -1,        // 证件类型简码[暂不确定为数字还是字符串]
            certificate_name: '',       // 证件名字
            certificate_number: '',     // 证件号码
            showDialog: false,          // 是否事件证件选择的对话框
            positive: null,// 反面
            Negative: null,// 正面
            person: null,// 手持
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
                                fontSize: 15,
                                color: colors.grey_2b,
                                marginRight: 15,
                            }}
                        >提交</Text>
                    </TouchableOpacity>
                ))}
                {this.renderChoiceDialog()}
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
        )
            ;
    }

    /* 渲染证件类型 */
    renderTypeOfCertificateView = () => {
        let {certificate_typeText} = this.state;
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
                    <Text>{certificate_typeText}</Text>
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

    /**
     * 渲染照片上传的按钮按钮
     * @param keyName
     * @param text 标题显示
     * @param action 回调动作
     * @returns {*}
     */
    renderPhotoButton = (keyName, text: String, action: Function) => {

        let element = this.state[keyName];
        if (element !== null) {
            return (
                <Image
                    style={{
                        width: PHOTO_WIDTH,
                        height: 155,
                        backgroundColor: colors.grey_f4,
                        borderRadius: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    source={element}
                    placeholder={require('../../image/placeholder.jpg')}
                />
            );

        }
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
                    {this.renderPhotoButton(filedName[0], '上传证件照正面', () => {
                        this.showImagerPicker(filedName[0])
                    })}
                    {this.renderPhotoButton(filedName[1], '上传证件照反面', () => {
                        this.showImagerPicker(filedName[1])
                    })}
                </View>

            </View>);
    };

    showImagerPicker = (keyName) => {
        ImagerPicker.selectPhotoTapped((response) => {
            let source = {uri: response.uri};
            switch (keyName) {
                case filedName[0]:
                    this.setState({
                        [filedName[0]]: source,
                    });
                    break;
                case filedName[1]:
                    this.setState({
                        [filedName[1]]: source,
                    });
                    break;
                case filedName[2]:
                    this.setState({
                        [filedName[2]]: source,
                    });
                    break;
            }
        })
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
                    {this.renderPhotoButton(filedName[2], '上传手持身份证照', () => {
                        this.showImagerPicker(filedName[2])
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
        this.toggleDialogVisiable(true);
    };


    /* 设置状态标记是否显示选择对话框 */
    toggleDialogVisiable = (visible: Boolean = false) => {
        this.setState({
            showDialog: visible,
        })
    };

    /* 渲染选择性别的对话框 */
    renderChoiceDialog = () => {
        let {showDialog} = this.state;
        if (!showDialog) {
            return null;
        }
        let {certificate_type} = this.state;
        return (
            <ChoiceDialog
                data={types}
                toggleVisiable={this.toggleDialogVisiable}
                setSelect={this.setSelect}
                select={certificate_type}/>
        );
    };

    /* 设置选择的证件类型 */
    setSelect = ({item, index}) => {
        this.toggleDialogVisiable(false);
        this.setState({
            certificate_typeText: item,
            certificate_type: index,
        });
    }
}

let PHOTO_WIDTH = 160;

const
    styles = StyleSheet.create({
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