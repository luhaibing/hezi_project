/**
 * 我的等级
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../util/colors';
import screen from "../util/screen_util";
import draws from "../util/draws";

class MyLevel extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            level: 0,
        };
    }

    /* 渲染视图 */
    render() {
        return (
            <View style={styles.root_contianer}>
                {draws.renderHeaderTitleView(this, "我的等级")}
                {draws.drawDivider()}
                <ScrollView>
                    {this.renderPersonInfoView()}
                    {draws.drawDivider()}
                    {this.renderLevelInfoView()}
                    {draws.drawDivider()}
                    <Text style={{
                        fontsize: 15,
                        color: colors.grey_2b,
                        marginLeft: 15,
                        marginTop: 13,
                        height: 21
                    }}>等级列表</Text>
                    {this.generateLevelsView()}
                </ScrollView>
            </View>
        );
    }


    /* 渲染个人信息 (头像和名字)*/
    renderPersonInfoView = (data) => {
        // let {imgUrl, userName} = data;
        let imgUrl = null;
        let userName;
        imgUrl = require('../../image/placeholder.jpg')
        // imgUrl = {url: 'https://ws1.sinaimg.cn/large/0065oQSqly1fvexaq313uj30qo0wldr4.jpg'};
        userName = "妖怪彭三刀";
        return (
            <View style={{
                height: 138,
                width: screen.width,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={imgUrl}
                    placeholder={require('../../image/placeholder.jpg')}
                    style={{
                        width: 60,
                        height: 60,
                        marginBottom: 8,
                        borderRadius: 30,
                    }}/>

                <Text style={{
                    fontsize: 17,
                    color: colors.grey_2b,
                }}>{userName}</Text>
            </View>
        );
    };

    /* 渲染等级视图 */
    renderLevelInfoView = (data) => {
        /* 线性渐变的起颜点和终点颜色 */
        const linear_gradient_startcolor = '#FF7727';
        const linear_gradient_endColor = '#FF2B2B';
        this.saveLevel(1);
        return (
            <View style={{
                paddingBottom: 23,
                paddingTop: 15,
            }}>
                <Text style={{
                    height: 21,
                    fontsize: 15,
                    color: colors.grey_2b,
                    marginLeft: 16,
                }}>等级</Text>
                <Text style={{
                    height: 20,
                    fontsize: 14,
                    color: colors.grey_90,
                    marginLeft: 16,
                    marginTop: 4,
                }}
                >总算力20，000，000，000</Text>
                {this.generateLevelImage()}
                {/* todo:进度条待实现 */}
                <View style={{
                    width: screen.width - 18 * 2,
                    height: 4,
                    borderRadius: 2,
                    marginLeft: 18,
                    marginRight: 18,
                    marginTop: 0,
                    backgroundColor: colors.grey_d8,
                }}>
                    <View
                        style={{
                            width: screen.width - 18 * 2,
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: colors.grey_d8,
                        }}>
                        <LinearGradient
                            colors={
                                [linear_gradient_startcolor,
                                    linear_gradient_endColor]}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            style={{
                                height: 4,
                                width: 70,
                                borderRadius: 2,
                            }}/>
                    </View>
                </View>
            </View>
        );
    };

    /**
     * 获取等级图片
     * @returns {undefined}
     */
    generateLevelImage = () => {
        let imageSource = require('../../image/icon_grade.png');
        let offsetLeft = 50 - 18;
        return (<Image
            source={imageSource}
            style={{
                width: 30,
                height: 30,
                marginLeft: 18 + offsetLeft,
                marginTop: 15,
            }}
        />);
    };

    /* 生成等级的列表视图 */
    generateLevelsView = () => {
        let data = [];
        data.push({
            title: '等级',
            content: '总算力'
        });
        for (let i = 1; i <= 10; i++) {
            data.push({
                title: `Lv${i}`,
                content: '0-100'
            })
        }

        let {level} = this.state;
        return (
            <FlatList
                style={{
                    marginLeft: 25,
                    marginTop: 13,
                    marginRight: 29,
                    marginBottom: 12,
                }}
                data={data}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.list_item_container}>
                            <Text style={[((index === 0) ?
                                styles.list_first_text :
                                styles.list_other_text),
                                {
                                    color: (((index) === level) ?
                                        colors.red_2a : colors.grey_66)
                                }]}>
                                {item.title}</Text>
                            <View style={{
                                flex: 1,
                            }}/>
                            <Text style={[((index === 0) ?
                                styles.list_first_text :
                                styles.list_other_text),
                                {
                                    color: (((index) === level) ?
                                        colors.red_2a : colors.grey_66),
                                }]}>
                                {item.content}</Text>
                        </View>
                    );
                }}
            />)

    };

    /* 保存等级信息 */
    saveLevel = (number) => {
        this.state.level = 1;
    };

}

const styles = StyleSheet.create({
    root_contianer: {
        flex: 1,
        backgroundColor: screen.globalBackgroundColor,
    },
    list_item_container: {
        flexDirection: 'row',
    },
    list_first_text: {
        height: 21,
        fontSize: 15,
        color: colors.grey_66,
    },
    list_other_text: {
        height: 20,
        fontSize: 14,
        color: colors.grey_66,
        marginTop: 2,
        marginBottom: 5,
        marginRight: 2,
    },

});

export default MyLevel;