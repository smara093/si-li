import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { PropTypes } from 'prop-types';
import firebase from 'firebase';
import screens from '../constants/screens';

class Registration extends React.PureComponent {
  static navigationOptions = {
    title: 'register',
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      confirmedPassword: '',
      errorMessage: '',
    };
  }

  async registerWithEmail() {
    const setError = (message) => {
      this.setState({ errorMessage: message, password: '', confirmedPassword: '' });
    };

    if (this.state.password !== this.state.confirmedPassword) {
      setError('Whoops, it seems like you misspelled you password. Make sure they match');
      return;
    }

    try {
      const registeredUsed = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.userName, this.state.password);

      console.log('registered!', registeredUsed);

      // dispatch action informing the world we just registered
      this.props.navigation.navigate(screens.Lists);
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Whoops it seems like the email address is already in use, please use another one.');
          break;
        case 'auth/invalid-email':
          setError('Whoops it seems like we need a valid email address');
          break;
        case 'auth/weak-password':
          setError('Whoops it seems like we need a stronger password');
          break;
        default:
          setError('Everything went wrong. Please try again.');
      }
    }
  }

  render() {
    return (
      <View>
        <Text>{this.state.errorMessage}</Text>
        <TextInput
          placeholder="you@domain.com"
          value={this.state.userName}
          onChangeText={text => this.setState({ userName: text })}
          underlineColorAndroid="transparent"
        />
        <TextInput
          placeholder="your password"
          secureTextEntry
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          underlineColorAndroid="transparent"
        />
        <TextInput
          placeholder="confirm your password"
          secureTextEntry
          value={this.state.confirmedPassword}
          onChangeText={text => this.setState({ confirmedPassword: text })}
          onSubmitEditing={() => this.registerWithEmail()}
          underlineColorAndroid="transparent"
        />

        <Button onPress={() => this.registerWithEmail()} title="Register" />
      </View>
    );
  }
}

Registration.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Registration;
