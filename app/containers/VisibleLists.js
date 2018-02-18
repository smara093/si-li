import { connect } from 'react-redux';
import * as listsActions from '../actions/listsActions';

import SimpleList from '../components/SimpleList';

const mapStateToProps = state => ({
  newItem: state.lists.newList,
  list: { id: state.login.currentUser, items: state.lists.ownLists },
  screen: 'myVisibleLists',
});

const mapDispatchToProps = dispatch => ({
  onSelectItem: (list) => {
    dispatch(listsActions.selectList(list));
  },
  onAddItemClick: (newItem, list) => {
    if (newItem !== '') {
      dispatch(listsActions.addList(
        {
          name: newItem,
          lastModified: Date.now(),
          items: null,
        },
        list,
      ));
    }
  },
  onRemoveItem: (item) => {
    console.log('removing a  list', item);
  },
  onChangeText: (text) => {
    dispatch(listsActions.textUpdated(text));
  },
  onClearItemsClick: () => {
    // this should be configurable, optional and the button not displayed
  },
  onComponentInit: () => {},
});

const VisibleLists = connect(mapStateToProps, mapDispatchToProps)(SimpleList);

export default VisibleLists;
