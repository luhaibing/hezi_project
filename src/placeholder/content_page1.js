import React, {Component} from 'react';
import {View, Text} from 'react-native';

class ContentPage1 extends Component {

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>第二个页面:快讯</Text>
            </View>
        );
    }

}

export default ContentPage1;