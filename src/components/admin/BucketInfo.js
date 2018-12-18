import React, { Component } from 'react'
import { List, Card, message, Button } from 'antd'
import $api from '../../axios'

class bucketInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      marker: '',
      loading: true,
      files: []
    }
  }

  render () {
    return (
      <List grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 8 }}
        dataSource={this.state.files}
        loading={this.state.loading}
        renderItem={item => (
          <List.Item>
            <Card>{item.key}</Card>
          </List.Item>
        )}
      />
    )
  }

  componentWillMount () {
    const { name } = this.props.match.params
    this.geBucketFilesList(name)
  }

  async geBucketFilesList (name) {
    const data = {
      bucket: name,
      marker: this.state.marker,
      limit: 100,
      prefix: '',
      delimiter: ''
    }
    const response = await $api.get('/object/list', data)
    this.setState({ loading: false })
    console.log(response)
    if (response.data.errno === 0 && response.data.data.items) {
      this.setState({
        marker: response.data.data.marker,
        files: response.data.data.items
      })
    } else {
      message.warning(response.data.errmsg)
    }
  }

  async getBucketDomainList (name) {
    const response = await $api.get('/bucket/domain?bucket=' + name)
    console.log(response)
  }
}

export default bucketInfo
