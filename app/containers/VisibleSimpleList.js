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
      dispatch(simpleListActions.add({
        text: newItem,
        lastModified: Date.now(),
        isActive: true,
      }));
    }
  },
  onRemoveItem: (index) => {
    dispatch(simpleListActions.remove(index));
  },
  onChangeText: (text) => {
    dispatch(simpleListActions.updateText(text));
  },
  onClearItemsClick: () => {
    dispatch(simpleListActions.clearItems());
  },
});

const VisibleSimpleList = connect(mapStateToProps, mapDispatchToProps)(SimpleList);

export default VisibleSimpleList;
