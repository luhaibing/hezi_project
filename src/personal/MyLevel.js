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
    Platform,
} from 'react-native';
import {
    grey_2b as titleColor,
    grey_66 as contentColor
} from "../../colos";
import screen from "../util/screen_util";

class MyLevel extends Component {

    static navigationOptions = {
        header: null,
    };

    /* 渲染视图 */
    render() {
        return (
            <View>
                {screen.renderHeaderTitleView(this, "我的等级")}
                <Text>我的等级</Text>
            </View>
        );
    }

}

export default MyLevel;