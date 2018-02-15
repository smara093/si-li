import React from 'react';
import { View, FlatList, Button, TextInput } from 'react-native';
import { PropTypes } from 'prop-types';

import styles from './styles/SimpleListStyles';
import SimpleListItem from './SimpleListItem';

const itemKeyExtractor = item => item.id;

class SimpleList extends React.Component {
  // move this on select list action
  componentWillMount() {
    this.props.onComponentInit();
  }

  renderItem(item, index) {
    const { onRemoveItem, onSelectItem } = this.props;

    return (
      <SimpleListItem
        onRemoveItem={onRemoveItem}
        index={index}
        item={item}
        styles={styles}
        onSelectItem={onSelectItem}
      />
    );
  }

  render() {
    const {
      items, newItem, onAddItemClick, onChangeText, onClearItemsClick, owner,
    } = this.props;

    return (
      <View style={styles.container}>
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
            onPress={() => onAddItemClick(newItem, owner)}
            color="purple"
            style={{ flex: 1 }}
          />
        </View>
        {items &&
          items.length > 0 && (
            <View>
              <FlatList
                data={items}
                renderItem={({ item, index }) => this.renderItem(item, index)}
                keyExtractor={itemKeyExtractor}
                extraData={this.state}
              />
              <Button title="Clear Items" onPress={() => onClearItemsClick()} color="purple" />
            </View>
          )}
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
  onComponentInit: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func,
  owner: PropTypes.object,
};

SimpleList.defaultProps = {
  onSelectItem: () => {},
  owner: null,
};

export default SimpleList;
