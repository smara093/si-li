import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as activeListActions from '../actions/activeListActions';
import SimpleList from '../components/SimpleList';

class ActiveList extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state && navigation.state.params.title) || 'my-list',
  });

  render() {
    const {
      newItem,
      list,
      onAddItemClick,
      onRemoveItem,
      onChangeText,
      onClearItemsClick,
    } = this.props;

    return (
      <SimpleList
        newItem={newItem}
        list={list}
        onAddItemClick={onAddItemClick}
        onRemoveItem={onRemoveItem}
        onChangeText={onChangeText}
        onClearItemsClick={onClearItemsClick}
      />
    );
  }
}

ActiveList.propTypes = {
  newItem: PropTypes.string.isRequired,
  onAddItemClick: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onClearItemsClick: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  newItem: state.activeList.newItem,
  list: state.activeList,
});

const mapDispatchToProps = dispatch => ({
  onAddItemClick: (newItem, list) => {
    if (newItem) {
      const listItem = {
        text: newItem,
        lastModified: Date.now(),
        isActive: true,
      };
      dispatch(activeListActions.saveItemToList(listItem, list));
    }
  },
  onRemoveItem: (item) => {
    dispatch(activeListActions.removeItemFromList(item));
  },
  onChangeText: (text) => {
    dispatch(activeListActions.updateText(text));
  },
  onClearItemsClick: (list) => {
    dispatch(activeListActions.clearList(list));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveList);
