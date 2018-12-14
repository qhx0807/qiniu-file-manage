import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import styles from './Login.module.less'
import $api from '../../axios'

const FormItem = Form.Item

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const rules = {
      username: [{ required: true, message: 'Please input your username!' }],
      password: [{ required: true, message: 'Please input your Password!' }]
    }
    return (
      <div className={styles.login}>
        <Form>
          <FormItem>
            {getFieldDecorator('username', { rules: rules.username })(
              <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', { rules: rules.password })(
              <Input type='password' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Password' />
            )}
          </FormItem>
          <FormItem>
            <Button type='primary' loading={this.state.isLoading} block onClick={this.clickHandle.bind(this)}>Login</Button>
          </FormItem>
        </Form>
      </div>
    )
  }

  componentDidMount () {
    const defaultValue = {
      username: 'qhx0807',
      password: '123456'
    }
    this.props.form.setFieldsValue({ ...defaultValue })
  }

  clickHandle () {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ isLoading: true })
        const response = await $api.post('/login/index', values)
        if (response.data.errno === 0) {
          window.sessionStorage.setItem('name', response.data.data.name)
          window.sessionStorage.setItem('token', response.data.data.token)
          window.sessionStorage.setItem('avatar', response.data.data.avatar)
          window.sessionStorage.setItem('id', response.data.data.id)
          window.sessionStorage.setItem('remark', response.data.data.remark)
          window.sessionStorage.setItem('last_login_time', response.data.data.last_login_time)
          message.success('登录成功！')
          this.props.history.replace('/Main')
        } else {
          this.setState({ isLoading: false })
          message.warning(response.data.errmsg)
        }
      }
    })
  }
}

export default Form.create()(Login)
