import React from 'react';
import UploadBox from './uploadBox'
import '../../css/imgWindow.css'

const InputImgBox = ({input_lists, uploadDone}) => {
  const InputList = input_lists.map((item, idx)=>(
    <div className="InputImgBox" key={idx}>
      <UploadBox index={idx} uploadDone={uploadDone}/>
      <span className="ImgDescription">{item.description}</span>
    </div>
  ))
  return (
    <div>{InputList}</div>
  )
}

export default InputImgBox;