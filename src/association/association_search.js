/**
 *  社群的搜索页面
 */
import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import screen from '../util/screen_util';
import colors from "../util/colors";
import Utils from "../util/utils";
import draws from "../util/draws";
import storage from '../util/storage';
import constant from "../constant";

class AssociationSearchPage extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            // history: null,
            input: ''
        };
    }

    /*
    componentWillMount() {
        this.readHistory(
            (ref) => {
                this.setState({
                    history: ref,
                });
            },
            (err) => {
                this.setState({
                    history: []
                });
            });
    }
    */

    /* 渲染视图 */
    render() {
        return (
            <View style={{
                backgroundColor: colors.white,
                flex: 1,
            }}>
                {this.renderTopInputView()}
                {/*{this.renderSearchHistoryView()}*/}
                {/*{draws.drawDivider()}*/}
                {this.renderPopularSearchView()}
            </View>
        );
    }

    /* 渲染顶部输入的视图 */
    renderTopInputView = () => {
        let placeholderText = '盒子集团今日上线创业版 市值2000亿……';
        let {search} = this.state;
        return (
            <LinearGradient
                colors={[
                    colors.linear_gradient_startcolor,
                    colors.linear_gradient_endColor,
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.linearGradient}>

                <View
                    style={styles.input_inside_container}>
                    <Image style={styles.search_icon}
                           source={require('../../image/icon_search.png')}/>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={colors.white}
                        placeholder={placeholderText}
                        onChangeText={(text) => {
                            this.setState({
                                input: text,
                            })
                        }}
                        onEndEditing={() => {
                            let {input} = this.state;
                            // this.saveHistroy(input);
                            this.accessNetWork(input);
                        }}>
                        {search}
                    </TextInput>
                </View>
                <TouchableOpacity
                    activeOpacity={0.5}>
                    <Text style={styles.cancel_button}>
                        取消
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    };

    /**
     * 渲染标签页
     * @param text 标签
     * @param startColor
     * @param endColor
     * @param colorTint 标签的渲染色
     * @returns {*}
     */
    renderBookmarkView = (text: String, startColor = colors.grey_90,
                          endColor = colors.grey_90,
                          colorTint = colors.grey_90) => {
        /* 排除无效的值 */
        if (!Utils.isValuable(text)) {
            return null;
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    // this.saveHistroy(text, false);
                    this.setState({
                        search: text,
                    });
                    this.accessNetWork(text);
                }}>
                <LinearGradient
                    colors={[startColor, endColor]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.bookmarks_outside_container}>
                    <View style={styles.bookmarks_inside_container}>
                        <Text style={[
                            styles.bookmarks,
                            {color: colorTint,}
                        ]}>{text}</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    };

   /* /!* 历史搜索 *!/
    renderSearchHistoryView = () => {
        let {history} = this.state;
        return (
            <View style={styles.type_container}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={styles.title}>历史搜索</Text>
                    <View style={styles.space}/>
                    <TouchableOpacity
                        onPress={() => {
                            this.cleanHistroy();
                        }}>
                        <Text style={styles.title}> 清空</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {this.loadHistoryBookMarks(history)}
                </View>
            </View>
        );
    };

    /!* 加载历史 *!/
    loadHistoryBookMarks = (history) => {
        /!* history = [
            '比特币',
            '比特币',
            '比特币比特币',
            '比特币',
            '比特币比特币',
        ]; *!/
        if (history === null || history === undefined || history.length === 0) {
            return null;
        }
        return history.map((item) => {
            return (this.renderBookmarkView(item));
        })
    };*/

    /* 渲染热门搜索 */
    renderPopularSearchView = () => {
        let datas = ['比特币', '比特币', '比特币比特币', '比特币', '比特币比特币'];
        return (
            <View style={styles.type_container}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={styles.title}>热门搜索</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {this.loadPopularBookMarks(datas)}
                </View>
            </View>
        );
    };

    /* 加载热门标签  */
    loadPopularBookMarks = (datas) => {
        if (datas === null || datas === undefined || datas.length === 0) {
            return null;
        }
        return datas.map((item) => {
            return (this.renderBookmarkView(item,
                colors.linear_gradient_startcolor,
                colors.linear_gradient_endColor,
                colors.red_2a));
        })
    };

    /*/!**
     * 保存搜索记录
     * @param text 文本文字
     * @param flag 是否保存数据和刷新页面
     *!/
    saveHistroy = (text: String, flag: Boolean = true) => {
        let {history} = this.state;
        if (history === null) {
            /!* 即初始化还未完毕 *!/
            /!* 那就简单粗暴的认为没有数据 *!/
            history = [];
        }
        /!*else {*!/
        if (history.includes(text)) {
            // 已经存在该条历史;
            return;
        }
        history.push(text);
        storage.save({
            key: constant.home_search_history,
            data: history,
        });
        if (flag) {
            this.setState({
                history: history,
            });
        }
        /!*}*!/
    };

    /!**
     * 读取搜索记录
     * @param successAction
     * @param errorAction
     *!/
    readHistory = (successAction, errorAction) => {
        storage
            .load({
                key: constant.home_search_history,
            })
            .then(ref => {
                if (successAction != null) {
                    successAction(ref);
                }
            })
            .catch(err => {
                switch (err.name) {
                    case 'ExpiredError':
                    case 'NotFoundError':
                        /!* 数据为空 *!/
                        /!* 数据过期 *!/
                        if (errorAction != null) {
                            errorAction(err);
                        }
                        break;
                }
            })
    };

    /!**
     * 清除搜索历史
     *!/
    cleanHistroy = () => {
        /!* 移除本地的持久化 *!/
        storage.remove({
            key: constant.home_search_history,
        });
        /!* 刷新页面 *!/
        this.setState({
            history: [],
        })
    };
    */

    /**
     * 访问网络获取数据
     * @param text 检索的关键字
     */
    accessNetWork = (text: String) => {
        Utils.alert("访问网络,关键字 : " + text);
    }
}

const styles = StyleSheet.create({
    /* 渐变色背景 */
    linearGradient: {
        height: 43 + screen.verticalOffset,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 16,
        paddingTop: screen.verticalOffset,
        paddingRight: 16,
    },

    /* 顶部搜索带圆角的背景框 */
    input_inside_container: {
        flex: 1,
        height: 28,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.1823)',
        alignItems: 'center',
        flexDirection: 'row',
    },
    /* 搜索图标 */
    search_icon: {
        width: 14,
        height: 14,
        marginLeft: 9,
        marginRight: 10,
    },
    /* 搜索输入 */
    input: {
        flex: 1,
        height: 43,
        fontSize: 13,
        color: colors.white,
    },
    /* 热门和历史的最外层容器 */
    type_container: {
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 18,
        paddingBottom: 7.5,
        backgroundColor: colors.white,
    },
    /* 空白部分填充区域 */
    space: {
        flex: 1,
    },
    /* 历史和热门的标题 */
    title: {
        fontSize: 15,
        color: colors.grey_66,
        marginLeft: 10.5,
    },

    /* todo: */
    /* 历史和热门的标签 */
    bookmarks: {
        fontSize: 13,
    },
    /* 取消按钮*/
    cancel_button: {
        fontSize: 15,
        color: colors.white,
        width: 30,
        height: 21,
        marginLeft: 8,
        textAlign: 'center',
        alignSelf: 'flex-start',
        marginTop: (Utils.isIos() ? 6 : 0),
    },
    /* 标签页外层容器 */
    bookmarks_outside_container: {
        borderRadius: 15,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 21 / 2,
        marginLeft: 21 / 2,
        marginTop: 18,
        marginBottom: 18,
    },
    /* 标签页内层容器 */
    bookmarks_inside_container: {
        height: 28,
        marginLeft: 1,
        marginRight: 1,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        paddingRight: 13,
        paddingLeft: 13,
    }
});

export default AssociationSearchPage;