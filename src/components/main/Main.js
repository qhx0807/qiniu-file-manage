import React, { Component } from 'react'
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd'
import { renderRoutes } from 'react-router-config'
import styles from './Main.module.less'

const { Header, Sider, Content, Footer } = Layout

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true,
      username: 'loading...',
      avatar: '',
      theme: 'dark',
      menuList: [
        {
          icon: 'windows',
          name: '存储空间',
          url: '/Main/BucketList'
        },
        {
          icon: 'user',
          name: '个人信息',
          url: '/Main/User'
        }
      ]
    }
  }

  render () {
    const menu = (
      <Menu onClick={this.onClickUserDropMenu.bind(this)}>
        <Menu.Item key='usercenter'>
          <Icon type='user' />
          <span>个人中心</span>
        </Menu.Item>
        <Menu.Item key='setting'>
          <Icon type='setting' />
          <span>安全设置</span>
        </Menu.Item>
        <Menu.Divider></Menu.Divider>
        <Menu.Item key='logout'>
          <Icon type='logout' />
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    )
    return (
      <Layout style={{ height: '100%' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          className={styles.side}
          theme={this.state.theme}
        >
          <div className={styles.logo} />
          <Menu theme={this.state.theme} onClick={this.onClickMenuHandle.bind(this)} mode='inline' defaultSelectedKeys={['bucket']}>
            {this.state.menuList.map(item => {
              return (<Menu.Item key={item.url}>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </Menu.Item>)
            })}
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: this.state.collapsed ? 80 : 200 }}>
          <Header className={styles.header}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle.bind(this)}
            />
            <div className={styles.headerRight}>
              <Dropdown overlay={menu}>
                <section>
                  <Avatar src={this.state.avatar} />
                  <span className={styles.username}>{this.state.username}</span>
                </section>
              </Dropdown>
            </div>
          </Header>
          <Content className={styles.content}>
            { renderRoutes(this.props.route.routes) }
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2018 Created by qhx0807</Footer>
        </Layout>
      </Layout>
    )
  }

  componentWillMount () {
    this.setState({
      username: window.sessionStorage.name || 'loading...',
      avatar: window.sessionStorage.avatar
    })
  }

  toggle () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  onClickMenuHandle (item) {
    const { key } = item
    this.props.history.push(key)
  }

  onClickUserDropMenu (item) {
    const { key } = item
    switch (key) {
      case 'logout':
        window.sessionStorage.clear()
        this.props.history.replace('/')
        break
      default:
        return false
    }
  }
}

export default Main
