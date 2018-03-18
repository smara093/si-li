import firebase from 'firebase';
import React from 'react';
import { ActivityIndicator, Button, View } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from '../components/styles/SimpleListStyles';
import Title from '../components/Title';
import screens from '../constants/screens';
import User from '../core/models/User';

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

  async componentDidMount() {
    // TODO: move into an app loading component
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await this.props.actions.dispatchUserAuthenticated(new User(user.uid, user.email, user.displayName));
        this.props.navigation.navigate(screens.Lists);
      }
    });
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
