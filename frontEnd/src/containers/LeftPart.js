import { connect } from 'react-redux'
import { 
  inputNumChange,
  outputNumChange,
  inputContentChanage,
  outputContentChange,
  cancelCreateModel,
  initMenu
} from '../actions'
import LeftSide from '../components/LeftSide/leftSide'

const mapStateToProps = (state) => ({
  input_description: state.template.template_creating.input_description,
  output_description: state.template.template_creating.output_description,
  menu_list: state.template.template_lists,
  isFetching: state.template.isFetching
})

const mapDispatchToProps = (dispatch) => ({
  onChangeInput: (value) => dispatch(inputNumChange(value)),
  onChangeOutput: (value) => dispatch(outputNumChange(value)),
  onWriteInputDesc: (value, index) => dispatch(inputContentChanage({value: value, index: index})),
  onWriteOutputDesc: (value, index) => dispatch(outputContentChange({value: value, index: index})),
  onCancelCreate: () => dispatch(cancelCreateModel()),
  initMenu: () => dispatch(initMenu())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSide);
