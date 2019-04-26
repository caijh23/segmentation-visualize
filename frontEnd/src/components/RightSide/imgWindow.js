import React from 'react';
import UploadBox from './uploadBox'
import '../../css/imgWindow.css'

const InputImgBox = ({input_lists}) => {
  const InputList = input_lists.map((item, idx)=>(
    <div className="InputImgBox" key={idx}>
      <UploadBox index={idx}/>
      <span className="ImgDescription">{item.description}</span>
    </div>
  ))
  return (
    <div>{InputList}</div>
  )
}

export default InputImgBox;