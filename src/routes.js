/**
 * 因为害怕路由跳转的时候名字写错,
 * 所以统一定义和使用
 * 链接
 */
import HomeNavigation from "./home/home_navigation";
import PersonalCenter from "./personal/personal_center";
import ChangePassWord from "./personal/change_password";
import ChangePhone from "./personal/change_phone";
import TreasureChest from "./personal/treasure_chest";
import MyLevel from "./personal/MyLevel";

export default [
    {
        name: '首页',
        path: 'home',
        link: HomeNavigation,
    },
    {
        name: '个人中心',
        path: 'personal_center',
        link: PersonalCenter,
    },
    {
        name: '修改密码',
        path: 'change_password',
        link: ChangePassWord,
    },
    {
        name: '修改手机号',
        path: 'change_phone',
        link: ChangePhone,
    },
    {
        name: '百宝箱',
        path: 'treasure_chest',
        link: TreasureChest,
    },
    {
        name: '我的等级',
        path: 'my_level',
        link: MyLevel,
    }
];
