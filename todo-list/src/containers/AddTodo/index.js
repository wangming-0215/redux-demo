import { connect } from 'react-redux';
import { addTodo } from '../../actions/actions';
import AddTodo from '../../components/AddTodo';

const mapDispatchToProps = dispatch => {
  return {
    submit: text => {
      dispatch(addTodo(text));
    }
  };
};

export default connect(null, mapDispatchToProps)(AddTodo);
