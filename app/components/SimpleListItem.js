import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { PropTypes } from 'prop-types';

class SimpleListItem extends React.PureComponent {
  render() {
    const {
      onRemoveItem, index, item, styles,
    } = this.props;

    return (
      <TouchableHighlight onLongPress={() => onRemoveItem(index)}>
        <View style={[styles.row, !item.isActive && styles.inactiveRow]}>
          <Text>{item.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

SimpleListItem.propTypes = {
  onRemoveItem: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

export default SimpleListItem;
