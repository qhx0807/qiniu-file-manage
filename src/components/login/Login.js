import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import styles from './Login.module.less'

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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.setState({ isLoading: true })
      }
    })
  }
}

export default Form.create()(Login)
