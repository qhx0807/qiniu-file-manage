import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { renderRoutes } from 'react-router-config'
import styles from './Main.module.less'

const { Header, Sider, Content, Footer } = Layout

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      theme: 'dark'
    }
  }

  render () {
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
          <Menu theme={this.state.theme} mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <Icon type='user' />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key='2'>
              <Icon type='video-camera' />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key='3'>
              <Icon type='upload' />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: this.state.collapsed ? 80 : 200 }}>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle.bind(this)}
            />
          </Header>
          <Content className={styles.content}>
            { renderRoutes(this.props.route.routes) }
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2018 Created by qhx0807</Footer>
        </Layout>
      </Layout>
    )
  }

  toggle () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
}

export default Main
