import { connect } from 'react-redux'
import RightSide from '../components/RightSide/rightSide'
import 
  { refreshOutput,
    getImageId, 
    runModelClick} from '../actions'

const mapStateToProps = (state) => ({
  input_lists: state.input_lists,
  output: state.output,
  reload: state.template.reload
})

const mapDispatchToProps = (dispatch) => ({
  refreshClick: () => dispatch(refreshOutput()),
  uploadDone: (imgId, index) => dispatch(getImageId({index: index, imgId: imgId})),
  runModelClick: () => dispatch(runModelClick())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSide)