import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Registration from '../components/Registration';
import * as registrationActions from '../actions/registrationActions';

const mapStateToProps = state => ({
  errorMessage: state.registration.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(registrationActions, dispatch),
});

const RegistrationScreen = connect(mapStateToProps, mapDispatchToProps)(Registration);

export default RegistrationScreen;
