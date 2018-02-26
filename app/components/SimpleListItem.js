import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { PropTypes } from 'prop-types';

class SimpleListItem extends React.PureComponent {
  render() {
    const {
      onRemoveItem, item, styles, onSelectItem, navigation,
    } = this.props;

    return (
      <View>
        <TouchableHighlight
          onLongPress={() => onRemoveItem(item, navigation)}
          onPress={() => {
            if (onSelectItem) onSelectItem(item, navigation);
          }}
        >
          <View style={[styles.row, !item.isActive && styles.inactiveRow]}>
            <Text>{item.text}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

SimpleListItem.propTypes = {
  onRemoveItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  onSelectItem: PropTypes.func,
  navigation: PropTypes.object,
};

SimpleListItem.defaultProps = {
  onSelectItem: null,
  navigation: null,
};

export default SimpleListItem;
