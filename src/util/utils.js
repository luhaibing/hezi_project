/**
 * 工具方法类
 */

/**
 * 验证是否是手机号
 * @param poneInput 输入的手机号
 * @returns {boolean} 结果
 */
import {Alert, Dimensions, Platform} from 'react-native';

function isPoneAvailable(poneInput) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(poneInput.val())) {
        return false;
    } else {
        return true;
    }
}


/**
 * 验证那个数值是否相等
 * @param obj1
 * @param obj2
 */
function isEqual(obj1, obj2) {
    return obj1 === obj2;
}

/**
 * 检查是否为空[保存, null ,undefined ]
 * @param obj
 * @returns {boolean}
 */
function isNullOrUndefined(obj) {
    return !(obj === undefined || obj === null);
}

function isNullOrUndefined2(obj) {
    return (obj === undefined || obj === null);
}

/**
 * 检查是否为有效数据
 * 即不为:null,undefined,和去除首位空格后不是空串
 * @param obj
 * @returns {boolean}
 */
function isValuable(obj) {
    // return isNullOrUndefined(obj) && !(obj.toString().trim().length === 0);
    return !isNullOrUndefined2(obj) && (obj.toString().trim().length !== 0);
}

/**
 * 检查数据的长度
 * @param obj
 * @param down 下限
 * @param up 上限
 * @returns {boolean}
 */
function checkValueLength(obj, down, up) {
    if (!isNullOrUndefined(obj)) {
        return;
    }
    let length = obj.toString().length;
    return !(length < down || length > up);
}

// /**
//  * 在状态中保存一个值
//  * 会刷新页面
//  * @param obj 控件对象
//  * @param name 字段名
//  * @param data 字段数据
//  */
// function saveState(obj, name, data) {
//     // TODO 检查各个值
//     obj.setState({
//         [name]: data,
//     })
// }
//
//
// /**
//  * 在状态中保存一个值
//  * 不会刷新页面
//  * @param obj 控件对象
//  * @param name 字段名
//  * @param data 字段数据
//  */
// function saveStateNotRender(obj, name, data) {
//     // TODO 检查各个值
//     // obj.setState({
//     //     [name]: data,
//     // })
//     obj.state[name] = data;
// }


export function isIos() {
    return (Platform.OS === 'ios');
}

export function isIphoneX() {
    let {width, height} = Dimensions.get('window');
    // iPhoneX
    let X_WIDTH = 375;
    let X_HEIGHT = 812;
    return (
        Platform.OS === 'ios' &&
        ((height === X_HEIGHT && width === X_WIDTH) ||
            (height === X_WIDTH && width === X_HEIGHT))
    )
}

/**
 * 显示一个对话框
 * @param msg
 */
function alert(msg: String) {
    Alert.alert(msg);
}


const Utils = {
    isPoneAvailable,
    alert,
    isEqual,
    isNullOrUndefined,
    isNullOrUndefined2,
    isValuable,
    checkValueLength,
    // saveState,
    // saveStateNotRender,
    isIos,
    isIphoneX,
};

export default Utils;