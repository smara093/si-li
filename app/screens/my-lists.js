import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button } from 'react-native';

import * as myListsActions from '../actions/myListsActions';
import screens from '../constants/screens';
import SimpleList from '../components/SimpleList';

class ListsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'my lists',
    headerLeft: null,
    headerRight: (
      <Button
        onPress={() => {
          navigation.navigate(screens.MyAccount);
        }}
        title="My Account"
        // TODO: Add nicer style
      />
    ),
  });

  render() {
    return (
      <SimpleList
        navigation={this.props.navigation}
        newItem={this.props.newItem}
        list={this.props.list}
        onSelectItem={this.props.onSelectItem}
        onAddItemClick={this.props.onAddItemClick}
        onChangeText={this.props.onChangeText}
        onClearItemsClick={this.props.onClearItemsClick}
        onRemoveItem={this.props.onRemoveItem}
      />
    );
  }
}

ListsScreen.propTypes = {
  navigation: PropTypes.object,
  newItem: PropTypes.string.isRequired,
  onAddItemClick: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onClearItemsClick: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
};

ListsScreen.defaultProps = {
  navigation: null,
};

const mapStateToProps = state => ({
  newItem: state.lists.newList,
  list: { id: state.login.currentUser.id, items: state.lists.ownLists },
});

const mapDispatchToProps = dispatch => ({
  onSelectItem: (list, navigation) => {
    dispatch(myListsActions.selectList(list));
    if (navigation) {
      navigation.navigate(screens.ActiveList, { title: list.name });
    } else {
      console.warn('navigation is not defined');
    }
  },
  onAddItemClick: (newItem, list) => {
    if (newItem !== '') {
      dispatch(myListsActions.addList(
        {
          name: newItem,
          lastModified: Date.now(),
          items: null,
        },
        list,
      ));
    }
  },
  onRemoveItem: (list) => {
    dispatch(myListsActions.removeList(list));
  },
  onChangeText: (text) => {
    dispatch(myListsActions.textUpdated(text));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsScreen);
