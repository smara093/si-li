import React from 'react';
import { PropTypes } from 'prop-types';
import { Text, TouchableNativeFeedback, View } from 'react-native';

import styles, { colors } from './styles/SimpleListStyles';

class MenuButton extends React.PureComponent {
  render() {
    const { title, onPress } = this.props;
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(colors.secondary)}
      >
        <View style={styles.menuButton}>
          <Text style={[styles.baseText, styles.menuText]}>{title.toUpperCase()}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

MenuButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default MenuButton;
