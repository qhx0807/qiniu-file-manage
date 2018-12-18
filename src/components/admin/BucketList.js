import React, { Component } from 'react'
import { Card, message } from 'antd'
import $api from '../../axios'

const gridStyle = {
  width: '25%',
  textAlign: 'center',
  cursor: 'pointer'
}

class BucketList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      bucketsArr: []
    }
  }

  render () {
    return (
      <div>
        <Card title='Buckets List' loading={this.state.loading}>
          { this.state.bucketsArr.map(item => {
            return (<Card.Grid key={item} onClick={this.onClickBucketHandle.bind(this, item)} style={gridStyle}>{item}</Card.Grid>)
          })}
          <Card.Grid style={gridStyle}>+</Card.Grid>
        </Card>
      </div>
    )
  }

  async componentWillMount () {
    const response = await $api.get('/bucket/buckets')
    this.setState({ loading: false })
    if (response.data.errno === 0) {
      this.setState({
        bucketsArr: response.data.data
      })
    } else {
      message.warning(response.data.errmsg)
    }
  }

  onClickBucketHandle (e) {
    this.props.history.push('/Main/BucketInfo/' + e)
  }
}

export default BucketList
