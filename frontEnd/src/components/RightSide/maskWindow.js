import React from 'react'
import MaskBox from './outputWindow'

const OutputImgBox = ({shown, output_lists}) => {
  const OutputList = output_lists.map((item, idx) => (
    <div className="outputBox" key={idx}>
      <MaskBox
        shown={shown}
        description={item.description}
        imgUrl={item.imgUrl}
      />
      <span className="outDesc">{item.description}</span>
    </div>
  ))
  return (
    <div>{OutputList}</div>
  )
}

export default OutputImgBox;