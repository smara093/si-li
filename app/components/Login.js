import React from 'react';
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  Image,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { PropTypes } from 'prop-types';
import styles, { colors } from '../components/styles/SimpleListStyles';
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
      setTimeout(() => this.setState({ isAuthenticating: false }), 2000);
    };

    return (
      <View style={styles.container}>
        <Title styles={styles} text="a simple list" />
        {this.state.isAuthenticating === true && <ActivityIndicator size="small" color="#ef7de7" />}
        {this.state.isAuthenticating === false && (
          <TouchableOpacity onPress={authenticateWithGoogle} useForeground>
            <Image
              // style={{ width: 382, height: 92 }}
              style={{ width: 267, height: 64 }}
              source={require('../assets/google-button.png')}
            />
          </TouchableOpacity>
          // TODO: add option to continue without authentication
        )}
      </View>
    );
  }
}

export default Login;
