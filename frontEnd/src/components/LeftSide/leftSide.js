import React, { Component } from  'react'
import { Layout, Menu, Icon, Modal } from 'antd'
import InputTemplate from './inputTemplate'
import '../../css/leftSide.css'

const { Sider } = Layout

class LeftSide extends Component {
  state = {
    menu_list: [
      {icon: 'form', text: '创建模板'}
    ],
    visible: false
  }

  componentDidMount() {
    this.props.initMenu()
              .catch(error => {
                Modal.info({
                  title: '提示',
                  content: '[网络错误] : 获取服务器模板列表失败　' + error
                })
              })
  }

  createTemplate = () => {
    this.setState({visible: true})
  }

  handleOk = (e) => {
    console.log(e)
    this.setState({visible: false})
  }

  handleCancel = (e) => {
    console.log(this.props)
    this.props.onCancelCreate()
    this.setState({visible: false})
  }

  render() {
    const props = this.props
    const MenuList = props.isFetching ? props.menu_list.map((item, idx) => (
      <Menu.Item 
        key={idx}
        style={{
          marginTop: '10px'
        }}
        onClick={item.text === '创建模板' ? () => {this.createTemplate()} : 
        () => {props.clickMenu(item.templateId)
                    .catch(error => {
                      Modal.info({
                        title: '提示',
                        content: '[网络错误] : ' + error
                      })
                    })}}
      >
        <Icon type={item.icon} />
        <span className="nav-text">{item.text}</span>
      </Menu.Item>
    )) : (<div>Loading...</div>)
    return (
      <Sider
      breakpoint="lg"
      collapsedWidth="0"
      >
        <div className="logo">
          请选择功能
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{
            marginTop: '40px'
          }}
        >
          {MenuList}
          <Modal
            title="创建模板"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            {this.state.visible ? <InputTemplate {...props} /> : null}
          </Modal>
        </Menu>
      </Sider>
    )
  }
}

export default LeftSide;