import React, {Component} from 'react';
import {View, Text} from 'react-native';

class ContentPage extends Component {

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>第一个页面:关注</Text>
            </View>
        );
    }

}

export default ContentPage;