/**
 * 百宝箱
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Platform,
    Alert,
    DeviceEventEmitter,
} from 'react-native';
import screen from "../util/screen_util";
import draws from "../util/draws";
import colors from "../util/colors";

class TreasureChest extends Component {

    static navigationOptions = {
        header: null,
    };

    /**
     * 模拟数据
     */
    mockdata = () => {
        return [
            {
                path: "https://github.com/mbwika/zalego_test/raw/master/Zalego.apk"
            }, {
                path: "https://github.com/luhaibing/test/raw/master/TencentVideo_V6.3.8.17373_848.apk",
            }]
    };

    /* 渲染视图 */
    render() {
        let datas = this.mockdata();
        // noinspection RequiredAttributes
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ffffff'
            }}>
                {draws.renderHeaderTitleView(this, "应用盒")}
                {draws.drawDivider()}
                <FlatList
                    data={datas}
                    renderItem={({item, index}) => {
                        return this.renderItemView(item, index);
                    }}/>
            </View>
        );
    }

    /* 渲染 item 项视图*/
    renderItemView = (item, index) => {
        return (
            <View>
                <View style={{
                    flexDirection: 'row',
                    height: 107,
                    alignItems: 'center',
                    paddingLeft: 15,
                    paddingRight: 15,
                }}>
                    <Image
                        // source={{url: 'http://i.imgur.com/UePbdph.jpg'}}
                        source={require('../../image/placeholder.jpg')}
                        placeholder={require('../../image/placeholder.jpg')}
                        style={{
                            width: 60,
                            height: 60,
                            /* TODO: 有待确认 */
                            borderRadius: 5,
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'column',
                            flex: 1,
                            marginLeft: 25,
                        }}>
                        <Text style={{
                            fontSize: 15,
                            color: colors.grey_2b,
                        }}>金色财经</Text>
                        <Text
                            style={{
                                fontSize: 13,
                                color: colors.grey_66,
                                marginTop: 5
                            }}>
                            最牛的比特币APP，赶快上车吧</Text>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 3
                        }}>

                            <Text style={{
                                fontSize: 11,
                                color: colors.grey_66,
                            }}>55W下载量 自媒体</Text>
                            {/*<Text style={{*/}
                            {/*fontSize: 11,*/}
                            {/*color: colors.grey_66,*/}
                            {/*}}>55W下载量</Text>*/}
                            {/*<Text style={{*/}
                            {/*fontSize: 11,*/}
                            {/*color: colors.grey_66,*/}
                            {/*marginLeft: 16*/}
                            {/*}}>自媒体</Text>*/}
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => {

                        }}>
                        <Text
                            style={{
                                width: 50,
                                height: 25,
                                fontSize: 13,
                                color: '#FF2E2A',
                                borderColor: '#FF2B2B',
                                borderWidth: 1,
                                borderRadius: 6,
                                textAlign: 'center',
                                paddingTop: 3.5,
                            }}>下载</Text>
                    </TouchableOpacity>
                </View>
                {draws.drawDivider()}
            </View>
        );
    };

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
        // marginTop: (Platform.OS === 'ios' ? 20 : 0),
        marginTop: screen.verticalOffset,
    },
    /* 顶部返回图标 */
    back_icon: {
        height: 20,
        width:
            20,
        marginLeft:
            16.3,
        marginRight:
            115.3,
    }
    ,
    header_view_title: {
        color: colors.grey_2b,
        fontSize:
            17,
    }
    ,
});

export default TreasureChest;
