import React from 'react';
import { PropTypes } from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles/SimpleListStyles';

class MenuButton extends React.PureComponent {
  render() {
    const { navigation, screenName, title } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(screenName);
        }}
      >
        <View style={styles.menuButton}>
          <Text style={styles.menuText}>{title.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

MenuButton.propTypes = {
  navigation: PropTypes.object.isRequired,
  screenName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MenuButton;
