export default [
    {
        name: '首页',
        url: '/home',
        icon: 'HomeOutlined'
    },
    {
        name: '车辆管理',
        icon: 'CarOutlined',
        url: '/truck',
        children: [
            {
                name: '车辆列表',
                url: '/truck/list'
            },
            {
                name: '添加车辆',
                url: '/truck/add'
            }
        ]
    },
    {
        name: '系统管理',
        icon: 'SettingOutlined',
        url: '/sys',
        children: [
            {
                name: '用户管理',
                url: '/sys/user'
            },
            {
                name: '角色管理',
                url: '/sys/role'
            },
            {
                name: '菜单管理',
                url: '/sys/menu'
            }
        ]
    }
];
