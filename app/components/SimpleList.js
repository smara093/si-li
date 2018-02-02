import React from 'react';
import { Text, View, FlatList, TouchableHighlight, Button, TextInput } from 'react-native';
import { PropTypes } from 'prop-types';

import styles from './styles/SimpleListStyles';
import Title from './Title';

const itemKeyExtractor = item => item.id;

class SimpleList extends React.Component {
  // render item should be its own dumb component, SimpleListItem
  renderItem(item, index) {
    const { onRemoveItem } = this.props;

    return (
      <TouchableHighlight onLongPress={() => onRemoveItem(index)}>
        <View style={[styles.row, !item.isActive && styles.inactiveRow]}>
          <Text>{item.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const {
      items, newItem, onAddItemClick, onChangeText, onClearItemsClick,
    } = this.props;

    return (
      <View style={styles.container}>
        <Title styles={styles} text="a simple list" />
        <View style={{ height: 60, flexDirection: 'row', padding: 10 }}>
          <TextInput
            placeholder="type to add a new item"
            value={newItem}
            onSubmitEditing={() => onAddItemClick(newItem)}
            onChangeText={text => onChangeText(text)}
            style={{ flex: 1 }}
            underlineColorAndroid="transparent"
          />
          <Button
            title="Add"
            onPress={() => onAddItemClick(newItem)}
            color="purple"
            style={{ flex: 1 }}
          />
        </View>
        <FlatList
          data={items}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={itemKeyExtractor}
          extraData={this.state}
        />
        <Button title="Clear Items" onPress={() => onClearItemsClick()} color="purple" />
      </View>
    );
  }
}

SimpleList.propTypes = {
  newItem: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onAddItemClick: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onClearItemsClick: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default SimpleList;
