import React from 'react';
// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  // {
  //   name: '反馈',
  //   path: 'https://github.com/alibaba/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'message',
  // },
  // {
  //   name: '帮助',
  //   path: 'https://alibaba.github.io/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'bangzhu',
  // },
];

const asideMenuConfig = [
  {
    name: '会员',
    path: '/member',
    icon: (
      <svg className="next-icon next-nav-icon" aria-hidden="true">
        <use xlinkHref="#icon-qingjingmoshi" />
      </svg>
    ),
    children: [
      {
        name: '会员管理',
        icon: (
          <svg className="next-icon next-nav-icon" aria-hidden="true">
            <use xlinkHref="#icon-wode" />
          </svg>
        ),
        path: '/member/manager',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
