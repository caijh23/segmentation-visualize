import React from 'react'
import { Layout } from 'antd'
import InputImgBox from './imgWindow'
import PageTitle from './title'
import OutputImgBox from './maskWindow'
import ButtonList from './ButtonList'
import '../../css/rightSide.css'

const { Header, Content } = Layout

const RightSide = ({input_lists, output, refreshClick}) => {
  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        <ButtonList refreshClick={refreshClick}/>
      </Header>
      <Content style={{
        margin: '24px 20px 0px 20px', padding: '1px', background: '#fff', minHeight: 280,
      }}
      >
        <div className="inputArea">
          <PageTitle title="输入图像" type="input" />
          <InputImgBox input_lists={input_lists} />
        </div> 
        <div className="outputArea">
          <PageTitle title="输出图像" type="output" />
          <OutputImgBox {...output} />
        </div>
      </Content>
    </Layout>
  )
}

export default RightSide;