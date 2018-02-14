import React from 'react';
import { Button } from 'react-native';
import { PropTypes } from 'prop-types';

export class Login extends React.PureComponent {
  static navigationOptions = {
    title: 'sign in',
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('ActiveList')}
        title="No thanks"
      />
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Login;
