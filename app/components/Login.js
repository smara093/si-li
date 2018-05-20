import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
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
        <Title styles={styles} text="welcome" />
        {this.state.isAuthenticating === true && (
          <ActivityIndicator size="small" color={colors.secondary} />
        )}
        {this.state.isAuthenticating === false && (
          <View>
            <Image
              source={require('../assets/large-logo.png')} // eslint-disable-line global-require
              style={{
                width: 122,
                height: 78,
                marginTop: 30,
                padding: 20,
                alignSelf: 'center',
              }}
            />
            <Text
              style={[
                styles.baseText,
                styles.text,
                {
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 16,
                  padding: 20,
                },
              ]}
            >
              use your Google account to sign in and start creating simple lists
            </Text>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={authenticateWithGoogle}
              useForeground
            >
              <Image
                style={{ width: 191, height: 46, alignSelf: 'center' }}
                source={require('../assets/google-button-1x.png')} // eslint-disable-line global-require
              />
            </TouchableOpacity>
            {/* TODO: add option to continue without authentication */}
          </View>
        )}
      </View>
    );
  }
}

export default Login;
