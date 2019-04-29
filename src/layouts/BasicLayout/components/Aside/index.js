import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import cx from 'classnames';
import { Icon, Nav } from '@alifd/next';

import Logo from '../Logo';
import { asideMenuConfig } from '../../../../menuConfig';
import Authorized from '../../../../utils/Authorized';

import './index.scss';

@withRouter
export default class Aside extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const openKeys = this.getDefaultOpenKeys();
    this.state = {
      collapse: props.collapse,
      openDrawer: false,
      openKeys,
    };

    this.openKeysCache = openKeys;
  }

  /**
   * 响应式通过抽屉形式切换菜单
   */
  toggleMenu = () => {
    const { openDrawer } = this.state;
    this.setState({
      openDrawer: !openDrawer,
    });
  };

  /**
   * 左侧菜单收缩切换
   */
  toggleCollapse = () => {
    const { collapse } = this.state;
    this.onOpenChange([])
      .then(() => {
        this.setState({
          collapse: !collapse,
        });
      });
  };

  /**
   * 左侧菜单收缩切换
   */
  onMenuClick = () => {
    this.toggleMenu();
  };

  /**
   * 获取默认展开菜单项
   */
  getDefaultOpenKeys = () => {
    const { location = {} } = this.props;
    const { pathname } = location;
    const menus = this.getNavMenuItems(asideMenuConfig);

    let openKeys = [];
    if (Array.isArray(menus)) {
      asideMenuConfig.forEach((item, index) => {
        if (pathname.startsWith(item.path)) {
          openKeys = [`${index}`];
        }
      });
    }

    return openKeys;
  };

  /**
   * 当前展开的菜单项
   */
  onOpenChange = (openKeys) => {
    return new Promise(resolve => {
      this.setState({
        openKeys,
      }, resolve);
      this.openKeysCache = openKeys;
    });
  };

  /**
   * 获取菜单项数据
   */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }

    return menusData
      .filter((item) => item.name && !item.hideInMenu)
      .map((item, index) => {
        const ItemDom = this.getSubMenuOrItem(item, index);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter((item) => item);
  };

  /**
   * 二级导航
   */
  getSubMenuOrItem = (item, index) => {
    if (item.children && item.children.some((child) => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);

      if (childrenItems && childrenItems.length > 0) {
        return (
          <Nav.SubNav
            key={index}
            icon={item.icon ? item.icon : null}
            label={item.name}
            className={this.props.location.pathname.includes(item.path) ? 'active' : ''}
          >
            {childrenItems}
          </Nav.SubNav>
        );
      }
      return null;
    }
    return (
      <Nav.Item key={item.path} icon={item.icon ? item.icon : null} className={this.props.location.pathname.includes(item.path) ? 'active' : ''}>
        <Link to={item.path}>{item.name}</Link>
      </Nav.Item>
    );
  };

  /**
   * 权限检查
   */
  checkPermissionItem = (authority, ItemDom) => {
    if (Authorized.check) {
      const { check } = Authorized;
      return check(authority, ItemDom);
    }

    return ItemDom;
  };

  render() {
    const { openDrawer } = this.state;
    const {
      location: { pathname },
      isMobile,
    } = this.props;

    return (
      <div
        className={cx('ice-design-layout-aside', { 'open-drawer': openDrawer })}
      >
        {isMobile && <Logo />}

        {isMobile && !openDrawer && (
          <a className="menu-btn" onClick={this.toggleMenu}>
            <Icon type="calendar" size="small" />
          </a>
        )}

        <Nav
          header={!isMobile && (
            <a className="collapse-btn" onClick={this.toggleCollapse}>
              <Icon
                type={this.state.collapse ? 'arrow-right' : 'arrow-left'}
                size="small"
              />
            </a>
          )}
          footer={
            !this.state.collapse &&
            <div className="brand-article">
              <div className="article" />
            </div>
          }
          iconOnly={this.state.collapse}
          mode={this.state.collapse ? 'popup' : 'inline'}
          style={{ width: 200 }}
          openMode="single"
          direction="ver"
          activeDirection={null}
          selectedKeys={[pathname]}
          defaultSelectedKeys={[pathname]}
          openKeys={this.state.openKeys}
          onOpen={this.onOpenChange}
          onClick={this.onMenuClick}
          hasArrow={false}
          hasTooltip
        >
          {this.getNavMenuItems(asideMenuConfig)}
        </Nav>
      </div>
    );
  }
}
