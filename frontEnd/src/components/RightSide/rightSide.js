import React from 'react'
import { Layout } from 'antd'
import InputImgBox from './imgWindow'
import PageTitle from './title'
import OutputImgBox from './maskWindow'
import ButtonList from './ButtonList'
import '../../css/rightSide.css'

const { Header, Content } = Layout

const RightSide = ({input_lists, output, refreshClick, uploadDone, runModelClick}) => {
  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        { input_lists.length !== 0 ?
        <ButtonList refreshClick={refreshClick} runModelClick={runModelClick}/> : null
        }
      </Header>
      <Content style={{
        margin: '24px 20px 0px 20px', padding: '1px', background: '#fff', minHeight: 280,
      }}
      >
        {input_lists.length === 0 ? <div className="inputArea" /> :
        <div className="inputArea">
          <PageTitle title="输入图像" type="input" />
          <InputImgBox input_lists={input_lists} uploadDone={uploadDone} />
        </div> }
        {output.output_lists.length === 0 ? 
        <div
          style = {{
            textAlign: 'center',
            height: '100%',
            color: '#1890ff',
            position: 'relative',
            top: '-30px',
            fontSize: '25px',
          }}
        >暂无模板选中，请点击左侧菜单选择模板或者创建模板
        </div> :
        <div className="outputArea">
          <PageTitle title="输出图像" type="output" />
          <OutputImgBox {...output} />
        </div> }
      </Content>
    </Layout>
  )
}

export default RightSide;