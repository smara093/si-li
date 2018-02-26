import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from '../components/styles/SimpleListStyles';
import Title from '../components/Title';

class Login extends React.PureComponent {
  static navigationOptions = {
    title: 'sign in',
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  render() {
    const { errorMessage, navigation, actions } = this.props;

    const authenticateUserWithEmailAndPassword = async () => {
      if (
        (await actions.authenticateUserWithEmailAndPassword(
          this.state.email,
          this.state.password,
        )) === true
      ) {
        navigation.navigate('Lists');
      }
    };

    return (
      <View>
        <Title styles={styles} text="a simple list" />
        <Text>{errorMessage}</Text>
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
          onSubmitEditing={authenticateUserWithEmailAndPassword}
          underlineColorAndroid="transparent"
        />

        <Button onPress={authenticateUserWithEmailAndPassword} title="Log in" />

        <Button
          onPress={() => {
            navigation.navigate('Registration', { email: this.state.email });
          }}
          title="Register now"
        />
      </View>
    );
  }
}

export default Login;
