import React, { Component } from 'react'
import $api from '../../axios'

class bucketInfo extends Component {
  render () {
    return (
      <div>
        bucketInfo
      </div>
    )
  }

  componentWillMount () {
    const { name } = this.props.match.params
    this.getBucketDomainList(name)
  }

  async geBucketFiles (name) {
    console.log(name)
    // const response = await $api.get()
  }

  async getBucketDomainList (name) {
    const response = await $api.get('/bucket/domain?bucket=' + name)
    console.log(response)
  }
}

export default bucketInfo
