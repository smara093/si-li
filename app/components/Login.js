import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { PropTypes } from 'prop-types';
import firebase from 'firebase';
import styles from '../components/styles/SimpleListStyles';
import Title from '../components/Title';

class Login extends React.PureComponent {
  static navigationOptions = {
    title: 'sign in',
  };

  // TODO: Extract error message into own component and reuse
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', errorMessage: '' };
  }

  async authenticateWithEmail() {
    // TODO: Move entire method into an action
    const setError = (message) => {
      this.setState({ errorMessage: message, password: '' });
    };

    try {
      const authenticatedUser = await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);

      this.props.actions.userHasAuthenticated(authenticatedUser);
      // TODO: move navigation in login actions
      this.props.navigation.navigate('Lists');
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          setError('Are you sure your password is correct?');
          break;
        default:
          setError('Something went wrong, please try again');
      }
    }
  }

  render() {
    return (
      <View>
        <Title styles={styles} text="a simple list" />
        <Text>{this.state.errorMessage}</Text>
        <TextInput
          placeholder="you@domain.com"
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
          underlineColorAndroid="transparent"
        />
        <TextInput
          placeholder="your password"
          secureTextEntry
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          onSubmitEditing={() => this.authenticateWithEmail()}
          underlineColorAndroid="transparent"
        />

        <Button onPress={() => this.authenticateWithEmail()} title="Log in" />

        <Button
          onPress={() => {
            this.props.navigation.navigate('Registration', { email: this.state.email });
          }}
          title="Register now"
        />
      </View>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default Login;
