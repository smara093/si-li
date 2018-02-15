import { connect } from 'react-redux';
import * as listsActions from '../actions/listsActions';

import SimpleList from '../components/SimpleList';

const mapStateToProps = state => ({
  items: state.lists.ownLists,
  newItem: state.lists.newList,
  owner: { id: state.login.currentUser },
});

const mapDispatchToProps = dispatch => ({
  onSelectItem: (list) => {
    dispatch(listsActions.selectList(list));
  },
  onAddItemClick: (newItem, owner) => {
    if (newItem !== '') {
      dispatch(listsActions.addList(
        {
          name: newItem,
          lastModified: Date.now(),
          items: null,
        },
        owner,
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
