import React from 'react';
import { View, FlatList, Button, TextInput } from 'react-native';
import { PropTypes } from 'prop-types';

import styles from './styles/SimpleListStyles';
import SimpleListItem from './SimpleListItem';

const itemKeyExtractor = item => item.id;

class SimpleList extends React.Component {
  renderItem(item, index) {
    const { onRemoveItem, onSelectItem, navigation } = this.props;

    return (
      <SimpleListItem
        onRemoveItem={onRemoveItem}
        index={index}
        item={item}
        styles={styles}
        onSelectItem={onSelectItem}
        navigation={navigation}
      />
    );
  }

  render() {
    const {
      newItem, onAddItemClick, onChangeText, onClearItemsClick, list,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ height: 60, flexDirection: 'row', padding: 10 }}>
          <TextInput
            placeholder="type to add a new item"
            value={newItem}
            onSubmitEditing={() => onAddItemClick(newItem, list)}
            onChangeText={text => onChangeText(text)}
            style={{ flex: 1 }}
            underlineColorAndroid="transparent"
          />
          <Button
            title="Add"
            onPress={() => onAddItemClick(newItem, list)}
            color="purple"
            style={{ flex: 1 }}
          />
        </View>
        {list.items &&
          list.items.length > 0 && (
            <View>
              <FlatList
                data={list.items}
                renderItem={({ item, index }) => this.renderItem(item, index)}
                keyExtractor={itemKeyExtractor}
                extraData={this.state}
              />
              {onClearItemsClick && (
                <Button
                  title="Clear Items"
                  onPress={() => onClearItemsClick(list)}
                  color="purple"
                />
              )}
            </View>
          )}
      </View>
    );
  }
}

SimpleList.propTypes = {
  newItem: PropTypes.string.isRequired,
  onAddItemClick: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onClearItemsClick: PropTypes.func,
  onRemoveItem: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func,
  list: PropTypes.object.isRequired,
  navigation: PropTypes.object,
};

SimpleList.defaultProps = {
  onSelectItem: null,
  navigation: {},
  onClearItemsClick: null,
};

export default SimpleList;
