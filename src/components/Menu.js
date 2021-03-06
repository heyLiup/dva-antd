import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Sider = React.createClass({
  getInitialState() {
    return {
      current: '1',
    };
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  },
  render() {
    return (
      <Menu onClick={this.handleClick}
        style={{ width: 240 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>菜单一</span></span>}>
          <Menu.Item key="1"><Link to="Users">Users</Link></Menu.Item>
          <Menu.Item key="2"><Link to="Form">Form</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>菜单二</span></span>}>
          <Menu.Item key="3"><Link to="Login">Login</Link></Menu.Item>
          <Menu.Item key="4"><Link to="Regist">Regist</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>菜单三</span></span>}>
          <Menu.Item key="5"><Link to="WrappedNormalLoginForm">WrappedNormalLoginForm</Link></Menu.Item>
          <Menu.Item key="6"><Link to="32">菜单三2</Link></Menu.Item>
          <Menu.Item key="7"><Link to="33">菜单三3</Link></Menu.Item>
          <Menu.Item key="8"><Link to="34">菜单三4</Link></Menu.Item>
        </SubMenu>
      </Menu>
    );
  },
});

export default Sider
