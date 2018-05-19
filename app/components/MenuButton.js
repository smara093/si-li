import React from 'react';
import { PropTypes } from 'prop-types';
import { Text, TouchableNativeFeedback, View } from 'react-native';

import styles from './styles/SimpleListStyles';

class MenuButton extends React.PureComponent {
  render() {
    const { navigation, screenName, title } = this.props;
    return (
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate(screenName);
        }}
        background={TouchableNativeFeedback.Ripple('pink')}
      >
        <View style={styles.menuButton}>
          <Text style={styles.menuText}>{title.toUpperCase()}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

MenuButton.propTypes = {
  navigation: PropTypes.object.isRequired,
  screenName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MenuButton;
