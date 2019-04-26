import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd'

const UploadButton = () => (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
)

class UploadBox extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileExist: false
  }
  handleUpload = (props) => {
    const {file} = props
    console.log(props)
    if (file.status === 'uploading') {
      this.setState({ fileExist: true })
      return
    }
    if (file.status === 'done') {
      this.setState({ fileExist: true })
      return
    }
    if (file.status === 'error') {
      //add notice here
    }
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handleRemove = () => {
      console.log('remove')
      this.setState({fileExist: false})
  }

  render() {
    const { previewVisible, fileExist, previewImage } = this.state
    //const inputType = ['前景', '背景']

    return (
      <div className="uploadBox">
        <Upload
          accept="image/*"
          listType="picture-card"
          onChange={this.handleUpload}
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}
        >
        {fileExist ? null : <UploadButton />}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default UploadBox;