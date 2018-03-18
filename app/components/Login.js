import React from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from '../components/styles/SimpleListStyles';
import Title from '../components/Title';
import screens from '../constants/screens';

class Login extends React.PureComponent {
  static navigationOptions = {
    title: 'sign in',
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticating: false,
    };
  }

  render() {
    const { navigation, actions } = this.props;

    const authenticateWithGoogle = async () => {
      this.setState({ isAuthenticating: true });
      await actions.authenticateWithGoogle();
      navigation.navigate(screens.Lists);
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
