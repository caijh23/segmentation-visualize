import React, { Component } from 'react'
import { PageHeader, Icon } from 'antd'

class PageTitle extends Component {
  render() {
    return (
      <PageHeader
        onBack={() => null}
        title={this.props.title}
        backIcon={
          this.props.type === 'input' ? <Icon type="edit" /> : <Icon type="area-chart" />
        }
        style={
          {
            borderBottom: '1px dashed #40a9ff',
            padding: '10px 4px',
            margin: '6px 20px',
          }
        }
      >

      </PageHeader>
    ) 
  }
}

export default PageTitle;