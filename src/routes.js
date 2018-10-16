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
import Authentication from "./personal/authentication";
import HomeSearchPage from "./home/home_search";
import AssociationSearchPage from "./association/association_search";

export default [
    {
        name: '首页',
        path: 'home',
        link: HomeNavigation,
        index: 0,
    },
    {
        name: '个人中心',
        path: 'personal_center',
        link: PersonalCenter,
        index: 1,
    },
    {
        name: '修改密码',
        path: 'change_password',
        link: ChangePassWord,
        index: 2,
    },
    {
        name: '修改手机号',
        path: 'change_phone',
        link: ChangePhone,
        index: 3,
    },
    {
        name: '百宝箱',
        path: 'treasure_chest',
        link: TreasureChest,
        index: 4,
    },
    {
        name: '我的等级',
        path: 'my_level',
        link: MyLevel,
        index: 5,
    },
    {
        name: '实名认证',
        path: 'authentication',
        link: Authentication,
        index: 6,
    },
    {
        name: '首页-搜索',
        path: 'home_search',
        link: HomeSearchPage,
        index: 7,
    },
    {
        name: '社群-搜索',
        path: 'association_search',
        link: AssociationSearchPage,
        index: 8,
    },
];
