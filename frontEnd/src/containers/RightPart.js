import { connect } from 'react-redux'
import RightSide from '../components/RightSide/rightSide'
import { refreshOutput } from '../actions'

const mapStateToProps = (state) => ({
  input_lists: state.input_lists,
  output: state.output
})

const mapDispatchToProps = (dispatch) => ({
  refreshClick: () => dispatch(refreshOutput())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSide)