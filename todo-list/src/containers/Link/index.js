import { connect } from 'react-redux';
import { setVisibilityFileter } from '../../actions/actions';
import Link from '../../components/Link';

// ownProps容器组件的props, 也就是传入展示组件的props
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFileter(ownProps.filter));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Link);
