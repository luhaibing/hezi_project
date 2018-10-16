/**
 * 自定义 TopNavigation 的导航头部视图
 * [滑动部分使用的是ScrollView]
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity, Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import screen from '../util/screen_util';

const top_navigation_height = 43;

class TopNavigationBarView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            /* 搜索 */
            searchPress: this.props.searchPress,
            /* 挖矿 */
            miningPress: this.props.miningPress,
        };
    }


    /* 视图渲染 */
    render() {
        /* 线性渐变的起颜点和终点颜色 */
        const linear_gradient_startcolor = '#FF7727';
        const linear_gradient_endColor = '#FF2B2B';

        const {navigation,} = this.props;
        const {routes,} = navigation.state;

        return (
            <View style={styles.top_navigation_container}>
                <LinearGradient
                    colors={[linear_gradient_startcolor,
                        linear_gradient_endColor]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.linearGradient}>

                    {/* 搜索图标*/}
                    <TouchableOpacity
                        onPress={this.state.searchPress}>
                        <Image
                            source={require('../../image/icon_search.png')}
                            style={styles.top_navigation_icon_search}/>
                    </TouchableOpacity>

                    {/* 可滑动部分*/}
                    <ScrollView
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        {/* 可执行部分 动态加载 */}
                        {routes && routes.map((route, index) =>
                            this.renderItem(route, index))}
                    </ScrollView>

                    {/* 挖矿图标*/}
                    <TouchableOpacity
                        onPress={this.state.miningPress}>
                        <View
                            style={styles.top_navigation_mining_container}>
                            <Image source={require('../../image/icon_mining.png')}
                                   style={styles.top_navigation_mining_icon}/>
                            <Text
                                style={styles.top_navigation_mining_text}>挖矿</Text>
                        </View>
                    </TouchableOpacity>

                </LinearGradient>
            </View>);
    }

    /* 每个 Tab 视图渲染 */
    renderItem = (route, index) => {
        const {
            navigation,
            jumpToIndex,
            jumpTo,
        } = this.props;

        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused: focused,
            route: route,
            tintColor: color
        };
        // return (
        //     <TouchableOpacity
        //         key={route.key}
        //         style={styles.tabItem}
        //         onPress={() => {
        //             jumpToIndex(index)
        //             /* 虽然 react-navigation 一直提示我
        //              * 使用 jumpTo替代 jumpToIndex,但是 使用了就报错 */
        //             // jumpTo(index)
        //         }}>
        //         <Text key={index}
        //               style={[
        //                   {
        //                       ...styles.tabText, color,
        //                   },
        //                   {
        //                       color: '#FFFFFF',
        //                       marginRight: 8, marginLeft: 8,
        //                   }]}>
        //             {this.props.getLabel(TabScene)}
        //         </Text>
        //     </TouchableOpacity>
        // );

        return (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text
                    onPress={() => {
                        jumpToIndex(index);
                        /* 虽然 react-navigation 一直提示我
                         * 使用 jumpTo替代 jumpToIndex,但是 使用了就报错 */
                        // jumpTo(index)
                    }}
                    key={route.key}
                    style={[
                        {...styles.tabText, color,},
                        {
                            color: '#FFFFFF',
                            marginRight: 10,
                            marginLeft: 10,
                            marginBottom: 4,
                            fontSize: 16,
                        }]}>
                    {this.props.getLabel(TabScene)}
                </Text>
                <View style={{
                    width: 30,
                    height: focused ? 2 : 0,
                    backgroundColor: '#FFFFFF'
                }}/>
            </View>
        );

        // return (
        //     <View style={{
        //         width:30,
        //         height:30,
        //         backgroundColor: '#FFFFFF',
        //     }}/>
        // );
    }

}

const styles = StyleSheet.create({
    top_navigation_container: {
        // backgroundColor: '#FFFFFF',
        // height: top_navigation_height,
    },
    linearGradient: {
        height: top_navigation_height + screen.verticalOffset,
        left: 0,
        top: 0,
        width: screen.width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: screen.verticalOffset,
    },
    top_navigation_icon_search: {
        width: 17.3,
        height: 17.3,
        marginRight: 15,
        marginLeft: 15,
    },
    top_navigation_mining_container: {
        marginRight: 15,
        marginLeft: 15,
    },
    top_navigation_mining_icon: {
        width: 20,
        height: 18
    },
    top_navigation_mining_text: {
        marginTop: 2,
        fontSize: 10,
        color: '#FFFFFF'
    },

    tab_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    // tabItem: {
    //     width: SCALE(100),
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
});


export default TopNavigationBarView;