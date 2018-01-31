import React from 'react';
import { Text, View, FlatList, TouchableHighlight, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { actionCreators } from './listRedux';
import styles from './styles';
import Title from './Title';

const mapStateToProps = state => ({
  items: state.items,
  newItem: state.newItem,
});

class SimpleList extends React.Component {
  constructor(props) {
    super(props);
    this.itemKeyExtractor = item => item.id;
    this.changeText = this.changeText.bind(this);
    this.addItem = this.addItem.bind(this);
    this.clearItems = this.clearItems.bind(this);
  }

  removeItem(index) {
    const { dispatch } = this.props;
    dispatch(actionCreators.remove(index));
  }

  changeText(text) {
    const { dispatch } = this.props;
    dispatch(actionCreators.updateText(text));
  }

  clearItems() {
    const { dispatch } = this.props;
    dispatch(actionCreators.clearItems());
  }

  addItem() {
    const { dispatch, newItem } = this.props;
    if (newItem) {
      dispatch(actionCreators.add({
        key: Date.now(),
        text: newItem,
        lastModified: Date.now(),
        isActive: true,
      }));
    }
  }

  renderItem(item, index) {
    return (
      <TouchableHighlight
        onLongPress={() => {
          this.removeItem(index);
        }}
      >
        <View style={[styles.row, !item.isActive && styles.inactiveRow]}>
          <Text>{item.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { items, newItem } = this.props;

    return (
      <View style={styles.container}>
        <Title styles={styles} text="a simple list" />
        <View style={{ height: 60, flexDirection: 'row', padding: 10 }}>
          <TextInput
            placeholder="type to add a new item"
            value={newItem}
            onSubmitEditing={this.addItem}
            onChangeText={this.changeText}
            style={{ flex: 1 }}
            underlineColorAndroid="transparent"
          />
          <Button title="Add" onPress={this.addItem} color="purple" style={{ flex: 1 }} />
        </View>
        <FlatList
          data={items}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={this.itemKeyExtractor}
          extraData={this.state}
        />
        <Button title="Clear Items" onPress={this.clearItems} color="purple" />
      </View>
    );
  }
}

SimpleList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newItem: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(SimpleList);
