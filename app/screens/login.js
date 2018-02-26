import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../components/Login';
import * as loginActions from '../actions/loginActions';

const mapStateToProps = state => ({
  errorMessage: state.login.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(loginActions, dispatch),
});

const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginScreen;
