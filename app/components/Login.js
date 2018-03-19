import React from 'react';
import { ActivityIndicator, Button, View } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from '../components/styles/SimpleListStyles';
import Title from '../components/Title';

class Login extends React.PureComponent {
  static navigationOptions = {
    title: 'sign in',
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticating: false,
    };
  }

  render() {
    const { actions } = this.props;

    const authenticateWithGoogle = async () => {
      this.setState({ isAuthenticating: true });
      await actions.authenticateWithGoogle();
      this.setState({ isAuthenticating: false });
    };

    return (
      <View>
        <Title styles={styles} text="a simple list" />
        {this.state.isAuthenticating === true && <ActivityIndicator size="small" color="#ef7de7" />}
        {this.state.isAuthenticating === false && (
          <Button onPress={authenticateWithGoogle} title="Log in with Google" />
          // TODO: add proper styling to comply with Google Auth branding requirements
          // TODO: add option to continue without authentication
        )}
      </View>
    );
  }
}

export default Login;
