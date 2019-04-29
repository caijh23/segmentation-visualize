import { connect } from 'react-redux'
import { 
  inputNumChange,
  outputNumChange,
  inputContentChanage,
  outputContentChange,
  cancelCreateModel,
  initMenu,
  clickMenu,
  clickOk
} from '../actions'
import LeftSide from '../components/LeftSide/leftSide'

const mapStateToProps = (state) => ({
  input_lists: state.template.template_creating.input_lists,
  output_lists: state.template.template_creating.output_lists,
  menu_list: state.template.template_lists,
  isFetching: state.template.isFetching
})

const mapDispatchToProps = (dispatch) => ({
  onChangeInput: (value) => dispatch(inputNumChange(value)),
  onChangeOutput: (value) => dispatch(outputNumChange(value)),
  onWriteInputDesc: (value, index) => dispatch(inputContentChanage({value: value, index: index})),
  onWriteOutputDesc: (value, index) => dispatch(outputContentChange({value: value, index: index})),
  onCancelCreate: () => dispatch(cancelCreateModel()),
  initMenu: () => dispatch(initMenu()),
  clickMenu: (menuId) => dispatch(clickMenu(menuId)),
  clickOk: () => dispatch(clickOk())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSide);
