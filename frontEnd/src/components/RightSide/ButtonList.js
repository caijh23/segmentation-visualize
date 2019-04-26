import React, {Component} from 'react'
import { Button } from 'antd'

class ButtonList extends Component {
  state = {
    button_list: [
      {icon: 'play-circle',text: '运行模型', callfunc: this.props.runModelClick},
      {icon: 'redo', text: '刷新结果', callfunc: this.props.refreshClick}
    ]
  }
  render() {
    const HeadButtons = this.state.button_list.map((item, idx)=>(
      <Button
        type="primary"
        icon={item.icon}
        style={{
          float: 'right',
          margin: '16px 30px'
        }}
        key={idx}
        onClick={item.callfunc}
      >
        {item.text}
      </Button>
    ))
    return (
      <div
        style={{
          width: '97%',
          height: '100%',
          paddingRight: '3%',
        }}
      >
        {HeadButtons}
      </div>
    )
  }
}

export default ButtonList;