/**
 * 帮助回去屏幕尺寸
 */
import {
    Dimensions,
    Platform,
} from 'react-native';
import React from "react";
import colors from "./colors";
import Utils from "./utils";

// screen
const {width, height} = Dimensions.get('window');
// 垂直偏移

function getVerticalOffset() {
    if (Utils.isIphoneX()) {
        return 44;
    }
    return (Utils.isIos() ? 20 : 0);
}

const verticalOffset = getVerticalOffset();

const screen = {
    width,
    height,
    divider: 1,
    borderWidth: 1,
    dividerColor: colors.grey_ec,
    globalBackgroundColor: '#FFFFFF',
    verticalOffset,
};

export default screen;