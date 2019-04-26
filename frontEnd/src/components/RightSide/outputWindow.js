import React, { Component } from 'react'
import { Icon, Modal } from 'antd'
import '../../css/outputWindow.css'

class MaskBox extends Component {
  constructor(props) {
    super(props)
    this.handlePreview = this.handlePreview.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  state = {
    previewVisible: false
  }
  handlePreview() {
    this.setState({previewVisible: true})
  }

  handleCancel() {
    this.setState({previewVisible: false})
  }

  downloadFileName = () => {
    let index = this.props.imgUrl.lastIndexOf('/')
    let filename = this.props.imgUrl.substr(index + 1)
    return this.props.description + '_' + filename
  }
  render() {
    const previewVisible = this.state.previewVisible
    const filename = this.downloadFileName()
    return (
      <div className="OutputImgBox">
        {this.props.shown ? 
          <div className="ImgBorder">
            <div className="hoverBox">
              <div className="ImgBox">
                <img src={this.props.imgUrl} className="outputImg" alt={this.props.description}/>
              </div>
              <span className="iconBox">
                <Icon type="eye-o" title="Preview file" onClick={this.handlePreview}></Icon>
                <a href={this.props.imgUrl} download={filename}>
                  <Icon type="download" title="Download file"></Icon>
                </a>
                
              </span>
            </div>
          </div> : 
          <div className="waitOutput">
            <div className="waitText">waiting...</div>
          </div>
        }
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={this.props.imgUrl} />
        </Modal>
      </div>
    )
  }
}

export default MaskBox;