import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Alert,
} from 'react-native';

import {/*createMaterialTopTabNavigator,*/ TabNavigator} from 'react-navigation';
import screen from '../util/screen_util';
import ContentPage from "../placeholder/content_page";
import TopNavigationBarView from "./tab";

class HomeNavigation extends Component {

    static navigationOptions = {
        header: null,
    };

    /* 渲染视图 */
    render() {
        return (
            <View style={styles.container}>
                <TopTab/>
            </View>
        );
    }

}

// const TopTab = createMaterialTopTabNavigator({
const TopTab = TabNavigator({
    // 关注,快讯,头条,要闻,深度,专栏,行情,政策,区块链+
    attention: {
        screen: ContentPage,
        navigationOptions: {
            tabBarLabel: '关注',
        }
    },
    newsletter: {
        screen: ContentPage,
        navigationOptions: {
            tabBarLabel: '快讯',
        }
    },
    headline: {
        screen: ContentPage,
        navigationOptions: {
            tabBarLabel: '头条',
        }
    },
    news: {
        screen: ContentPage,
        navigationOptions: {
            tabBarLabel: '要闻',
        }
    },
    depth: {
        screen: ContentPage,
        navigationOptions: {
            tabBarLabel: '深度',
        }
    },
    special_column: {
        screen: ContentPage,
        navigationOptions: {
            tabBarLabel: '专栏',
        }
    },
    quotes: {
        screen: ContentPage,
        navigationOptions: {
            tabBarLabel: '行情',
        }
    },
    policy: {
        screen: ContentPage,
        navigationOptions: {
            tabBarLabel: '政策',
        }
    },
    block_chain: {
        screen: ContentPage,
        navigationOptions: {
            tabBarLabel: '区块链+',
        }
    },
}, {
    // initialRouteName:'newsletter',
    tabBarPosition: 'top',
    lazy: true,
    /*
      searchPress: this.props.searchPress,

        miningPress: this.props.miningPress,
    */
    tabBarComponent: (props) => {
        return (<TopNavigationBarView
            {...props}
            searchPress={() => {
                Alert.alert("搜索");
            }}
            miningPress={() => {
                Alert.alert("挖矿");
            }}
        />);
    },
    tabBarOptions: {
        style: {
            width: screen.width,
        },
        /* 不知道为什么后面取到没效果 */
        labelStyle: {
            color: '#FFFFFF'
        }
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default HomeNavigation;