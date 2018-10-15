/**
 * 选择器对话框
 */
/*
data:列表数据,
toggleVisiable:转变对话框的显示状态的回调,
setSelect:设置选择的回调
select:-1:选择的脚标
 */

import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    Modal,
    ToastAndroid,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native';
import screen from '../util/screen_util';
import colors from "../util/colors";
import draws from "../util/draws";
import LinearGradient from "react-native-linear-gradient";

class ChoiceDialog extends Component {

    /* 显示对话框 */
    static showDialog() {
    }

    /* 渲染视图 */
    render() {
        let ITEM_HEIGHT = 50;

        /* 数据,转变可见度 , 设置选中的回调 */
        let {data, toggleVisiable, setSelect, select} = this.props;

        return (
            <Modal
                transparent={true}
                animationType='fade'
                onRequestClose={() => {
                    toggleVisiable(false);
                }}>
                <TouchableOpacity
                    style={styles.touchable_container}
                    activeOpacity={1}
                    onPress={() => {
                        toggleVisiable(false);
                    }}>
                    <View
                        style={{
                            height: ITEM_HEIGHT * data.length,
                            backgroundColor: colors.white,
                            borderRadius: 8,
                        }}>
                        <FlatList
                            data={data}
                            renderItem={({item, index}) => {
                                let isSelect = select === index;
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelect({item, index});
                                        }}>
                                        <View>
                                            <View
                                                style={styles.view_container}>
                                                <Text
                                                    style={styles.item_title}>{item}</Text>

                                                <View style={{
                                                    flex: 1,
                                                }}/>
                                                <View
                                                    style={styles.item_container}>
                                                    {isSelect ? (<LinearGradient
                                                        colors={[
                                                            colors.linear_gradient_startcolor,
                                                            colors.linear_gradient_endColor]}
                                                        start={{x: 0, y: 0}}
                                                        end={{x: 1, y: 1}}
                                                        style={styles.linearGradient}/>) : null}
                                                </View>

                                            </View>
                                            {/*绘制分割线*/}
                                            {index === data.length - 1 ? null :
                                                draws.drawDivider(screen.divider, 290)}
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}/>
                    </View>
                </TouchableOpacity>
            </Modal>);
    }

    // /**
    //  * 切换对话框的可见状态
    //  * @param visible
    //  */
    // toggleVisiable = (visible: Boolean = false) => {
    //     let {component, select, keyName, dismisse} = this.props;
    //     dismisse();
    //     // component.setState({
    //     //     [keyName]: visible,
    //     // });
    //     // component[keyName] = visible;
    // }

}


const styles = StyleSheet.create({
    touchable_container: {
        width: screen.width,
        height: screen.height,
        backgroundColor: '#7D808080',
        justifyContent: 'center',
        alignItems: 'center',
    },
    view_container: {
        height: 48,
        width: 290,
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_title: {
        fontSize: 14,
        marginLeft: 17,
        color: colors.grey_2b,
    },
    item_container: {
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderRadius: 8,
        borderColor: colors.grey_d8,
        borderWidth: 1,
    },
    linearGradient: {
        width: 9.6,
        height: 9.6,
        borderRadius: 9.6 / 2,
        backgroundColor: '#FF2B2B'
    },
});


export default ChoiceDialog;