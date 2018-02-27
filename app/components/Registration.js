import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { PropTypes } from 'prop-types';
import screens from '../constants/screens';

class Registration extends React.PureComponent {
  static navigationOptions = {
    title: 'register',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmedPassword: '',
    };
  }

  render() {
    const { navigation, actions, errorMessage } = this.props;
    const { email, password, confirmedPassword } = this.state;
    const registerWithEmailAndPassword = async () => {
      if (
        (await actions.registerUserWithEmailAndPassword(email, password, confirmedPassword)) ===
        true
      ) {
        navigation.navigate(screens.Lists);
      }
    };

    return (
      <View>
        <Text>{errorMessage}</Text>
        <TextInput
          placeholder="you@domain.com"
          value={email}
          onChangeText={text => this.setState({ email: text })}
          underlineColorAndroid="transparent"
        />
        <TextInput
          placeholder="your password"
          secureTextEntry
          value={password}
          onChangeText={text => this.setState({ password: text })}
          underlineColorAndroid="transparent"
        />
        <TextInput
          placeholder="confirm your password"
          secureTextEntry
          value={confirmedPassword}
          onChangeText={text => this.setState({ confirmedPassword: text })}
          onSubmitEditing={registerWithEmailAndPassword}
          underlineColorAndroid="transparent"
        />

        <Button onPress={registerWithEmailAndPassword} title="Register" />
      </View>
    );
  }
}

Registration.propTypes = {
  navigation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default Registration;
