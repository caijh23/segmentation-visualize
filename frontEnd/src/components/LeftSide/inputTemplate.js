import React from 'react'
import { InputNumber, Input } from 'antd'

const DescList = ({arr, callfunc}) => {
  const ArrToList = arr.map((item, idx) => (
    <div key={idx}>
      <span>图像{idx + 1}的描述 : </span>
      <Input placeholder='请输入对图像的描述' onChange={(e)=>{callfunc(e.target.value,idx)}} />
    </div>
  ))
  return (
    <div>{ArrToList}</div>
  )
}

const InputTemplate = ({
  onChangeInput,
  onChangeOutput,
  onWriteInputDesc,
  onWriteOutputDesc,
  input_lists,
  output_lists,
  inputModelName,
  inputModelPath
}) => {
  return (
    <div>
      <span>模型的名字 : </span>
      <Input placeholder='请输入模型的名字' onChange={(e)=>{inputModelName(e.target.value)}} />
      <span>模型的路径 : </span>
      <Input placeholder='请输入模型在服务器上的路径' onChange={(e)=>{inputModelPath(e.target.value)}} />
      <div style={{height: '10px'}}/>
      <span>输入图像数目 : </span>
      <InputNumber min={1} max={3} defaultValue={1} onChange={onChangeInput} />
      <DescList arr={input_lists} callfunc={onWriteInputDesc}/>
      <div style={{height: '10px'}}/>
      <span>输出图像数目 : </span>
      <InputNumber min={1} max={3} defaultValue={1} onChange={onChangeOutput} />
      <DescList arr={output_lists} callfunc={onWriteOutputDesc}/>
    </div>
  )
}

export default InputTemplate;