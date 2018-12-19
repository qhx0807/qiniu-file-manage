import React, { Component } from 'react'
import { message, Divider, Table, Button } from 'antd'
import $api from '../../axios'

class bucketInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      marker: '',
      loading: true,
      files: [],
      columns: [
        {
          title: '文件名',
          dataIndex: 'key',
          key: 'key'
        },
        {
          title: '文件类型',
          dataIndex: 'mimeType',
          key: 'mimeType'
        },
        {
          title: '存储类型',
          dataIndex: 'type',
          key: 'type',
          render: (text) => {
            let str = text === 1 ? '低频存储' : '普通存储'
            return <span>{str}</span>
          }
        },
        {
          title: '文件大小',
          dataIndex: 'fsize',
          key: 'fsize'
        },
        {
          title: '最后更新',
          dataIndex: 'putTime',
          key: 'putTime'
        },
        {
          title: '操作',
          dataIndex: 'hash',
          key: 'hash',
          render: () => (
            <span>
              <a href='javascript:;'>预览</a>
              <Divider type='vertical' />
              <a href='javascript:;'>更多</a>
            </span>
          )
        }
      ]
    }
  }

  render () {
    return (
      <div>
        <Table
          style={{ minHeight: 600 }}
          columns={this.state.columns}
          pagination={false}
          loading={this.state.loading}
          dataSource={this.state.files} />
        <div style={{ textAlign: 'center' }}>
          { this.state.marker && <Button onClick={this.onClickLoadMore.bind(this)}>Load more</Button> }
        </div>
      </div>
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
      limit: 10,
      prefix: '',
      delimiter: ''
    }
    const response = await $api.get('/object/list', data)
    this.setState({ loading: false })
    console.log(response)
    if (response.data.errno === 0 && response.data.data.items) {
      this.setState({
        marker: response.data.data.marker,
        files: this.state.files.concat(response.data.data.items)
      })
    } else {
      message.warning(response.data.errmsg)
    }
  }

  async getBucketDomainList (name) {
    const response = await $api.get('/bucket/domain?bucket=' + name)
    console.log(response)
  }

  onClickLoadMore () {
    const { name } = this.props.match.params
    this.geBucketFilesList(name)
  }
}

export default bucketInfo
