// /**
//  * 上传文件的组件
//  */
// import React, {
//     Component,
// } from 'react';
// import {
//     StyleSheet,
//     View,
//     Text,
//     Image,
//     TouchableOpacity,
// } from 'react-native';
// import Utils from "../util/utils";
//
// class UpLoadComponent extends Component {
//
//     /* 渲染视图 */
//     render() {
//         return (
//             <TouchableOpacity
//                 onPress={() => {
//                     // 执行
//                     this.executeTask()
//                 }}>
//                 {this.props.view}
//             </TouchableOpacity>
//         );
//     }
//
//     /**
//      * 执行上传任务
//      */
//     executeTask = () => {
//         Utils.alert("执行上传任务")
//     };
//
// }
//
// const styles = StyleSheet.create({});
//
// export default UpLoadComponent;