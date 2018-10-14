import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import screen from './util/screen_util';
import {StackNavigator} from 'react-navigation';
import routes from '../src/routes';

class RootApp extends Component {

    static navigationOptions = {
        title: "选择需要进入的页面"
    };

    render() {
        let {navigate} = this.props.navigation;
        return (
            <FlatList
                data={routes}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigate(item.path, {/*参数*/})
                            }}>
                            <View style={{
                                // height: 30,
                                justifyContent: 'center',
                                borderBottomColor: '#000000',
                                // alignItems: 'center',
                                backgroundColor: '#FFFFFF',
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    marginLeft: 20,
                                    marginTop: 15,
                                    marginBottom: 15,
                                }}>
                                    {item.name}
                                </Text>
                                <View style={{
                                    height: (index === routes.length - 1) ?
                                        0 : screen.divider,
                                    backgroundColor: screen.dividerColor,
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}/>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        );
    }
}

/**
 * 根据集合数据生成路由的路径信息
 * @returns {{root: {screen: RootApp}}}
 */
function generateRouteConfigs() {
    const routeConfigs = {
        root: {
            screen: RootApp,
        },
    };
    routes.forEach((value, index) => {
        routeConfigs[value.path] = {
            screen: value.link
        };
    });
    return routeConfigs;
}

const AppStack = StackNavigator(generateRouteConfigs());

export default AppStack;