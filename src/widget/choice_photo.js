import ImagePicker from "react-native-image-picker";

/**
 * 选择图片控件视图需要外传,
 * 这儿只是简单的封装一下使用
 * react-native-imager-picker 部分
 */
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
// class ChoicePhotoView extends Component {
//
//     /* 渲染视图 */
//     render() {
//         /*return (
//             <TouchableOpacity
//                 onPress={() => {
//                     Utils.alert("选择上传图片")
//                 }}>
//                 {this.props.view}
//             </TouchableOpacity>
//         );*/
//     }
//
// }
//
// const styles = StyleSheet.create({});
//
// export default ChoicePhotoView;

let options = {
    // quality: 1.0,
    // maxWidth: 500,
    // maxHeight: 500,
    // storageOptions: {
    //     skipBackup: true
    // }
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '图片库',
    cameraType: 'back',
    mediaType: 'photo',
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


/**
 * 显示选择图片的对话框
 * @param deliverAction 传递响应
 *  (response)
 */
function selectPhotoTapped(deliverAction: Function) {

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            // 取消
            console.log('User cancelled photo picker');
        }
        else if (response.error) {
            // 错误
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            // 自定义按钮
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            // let source = {uri: response.uri};
            //
            // // You can also display the image using data:
            // // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            //
            // this.setState({
            //     avatarSource: source
            // });
            deliverAction(response);
        }
    });

}


const ImagerPicker = {
    options,
    selectPhotoTapped,
};

export default ImagerPicker;
