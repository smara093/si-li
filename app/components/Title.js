import React from 'react';
import * as PropTypes from 'prop-types';
import { Text } from 'react-native';

class Title extends React.PureComponent {
  render() {
    const { text, styles } = this.props;
    return <Text style={styles.title}>{text}</Text>;
  }
}

Title.propTypes = {
  styles: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default Title;
