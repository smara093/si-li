import { connect } from 'react-redux';
import Login from '../components/Login';
import * as loginActions from '../actions/loginActions';

const mapStateToProps = state => ({
  userName: state.login.userName,
});

const mapDispatchToProps = dispatch => ({
  authenticate: (userName) => {
    dispatch(loginActions.authenticate(userName));
  },
  updateUserName: (userName) => {
    dispatch(loginActions.updateUserName(userName));
  },
});

const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginScreen;
