import React from 'react';
import { Button, TextInput, View } from 'react-native';
import { PropTypes } from 'prop-types';

class Login extends React.PureComponent {
  static navigationOptions = {
    title: 'sign in',
  };

  authenticate(userName) {
    console.log(`authenticating ${userName}`);
    const { navigation, authenticate } = this.props;
    authenticate(userName);
    navigation.navigate('Lists');
  }

  render() {
    const { updateUserName, userName } = this.props;

    return (
      <View>
        <TextInput
          placeholder="your name"
          value={userName}
          onChangeText={text => updateUserName(text)}
          onSubmitEditing={() => this.authenticate(userName)}
          underlineColorAndroid="transparent"
        />
        <Button onPress={() => this.authenticate(userName)} title="go see my lists" />
      </View>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  updateUserName: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Login;
