import { connect } from 'react-redux';
import * as simpleListActions from '../actions/simpleListActions';
import SimpleList from '../components/SimpleList';

const mapStateToProps = state => ({
  items: state.items,
  newItem: state.newItem,
});

const mapDispatchToProps = dispatch => ({
  onAddItemClick: (newItem) => {
    if (newItem) {
      const listItem = {
        text: newItem,
        lastModified: Date.now(),
        isActive: true,
      };
      dispatch(simpleListActions.saveItemToList(listItem));
    }
  },
  onRemoveItem: (item) => {
    dispatch(simpleListActions.removeItemFromList(item));
  },
  onChangeText: (text) => {
    dispatch(simpleListActions.updateText(text));
  },
  onClearItemsClick: () => {
    dispatch(simpleListActions.clearList());
  },
  onComponentInit: () => {
    dispatch(simpleListActions.initData());
  },
});

const VisibleSimpleList = connect(mapStateToProps, mapDispatchToProps)(SimpleList,);

export default VisibleSimpleList;
