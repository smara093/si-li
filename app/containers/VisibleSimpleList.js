import { connect } from 'react-redux';
import * as simpleListActions from '../actions/simpleListActions';
import SimpleList from '../components/SimpleList';

const mapStateToProps = state => ({
  newItem: state.activeList.newItem,
  list: state.activeList,
  screen: 'myVisibleSimpleList',
});

const mapDispatchToProps = dispatch => ({
  onAddItemClick: (newItem, list) => {
    if (newItem) {
      const listItem = {
        text: newItem,
        lastModified: Date.now(),
        isActive: true,
      };
      dispatch(simpleListActions.saveItemToList(listItem, list));
    }
  },
  onRemoveItem: (item) => {
    dispatch(simpleListActions.removeItemFromList(item));
  },
  onChangeText: (text) => {
    dispatch(simpleListActions.updateText(text));
  },
  onClearItemsClick: (list) => {
    dispatch(simpleListActions.clearList(list));
  },
  onComponentInit: () => {},
});

const VisibleSimpleList = connect(mapStateToProps, mapDispatchToProps)(SimpleList);

export default VisibleSimpleList;
