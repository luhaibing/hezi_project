import {View} from "react-native";
import screen from "./util/screen_util";
import React from "react";


// export default {
//     dividerColor: '#666666',
//     drawDivider: function drawDivider(divider_height = 1) {
//         return (
//             <View
//                 style={{
//                     width: screen.width,
//                     height: divider_height,
//                     backgroundColor: '#ECECEC',
//                 }}
//             />
//         );
//     },
// }

/**
 * 绘制统用的分隔线
 * @param height 分割线高度
 * @param width 分割线长度
 * @param color 分割线颜色
 * @returns {*}
 */
const drawDivider = function dividerView(
    height = screen.divider,
    width = screen.width,
    color = screen.dividerColor) {
    return (
        <View
            style={{
                width: width,
                height: height,
                backgroundColor: color,
            }}
        />
    );
};
const draws = {
    drawDivider: drawDivider,
};

export default draws;