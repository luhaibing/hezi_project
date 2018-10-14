/**
 * 帮助回去屏幕尺寸
 */
import {
    Dimensions,
    StyleSheet,
    Platform,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    grey_2b as titleColor,
    grey_ec
} from '../../colos';
import React from "react";

const {width, height} = Dimensions.get('window');

const screen = {
    width,
    height,
    divider: 1,
    dividerColor: grey_ec,
    globalBackgroundColor: '#FFFFFF',
};

export default screen;