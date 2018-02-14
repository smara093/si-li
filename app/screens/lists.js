import { connect } from 'react-redux';
import * as listsActions from '../actions/listsActions';
import Lists from '../components/Lists';

const mapStateToProps = state => ({
  lists: state.lists,
});

const mapDispatchToProps = dispatch => ({
  onSelectList: () => {
    dispatch(listsActions.selectList());
  },
});

const ListsScreen = connect(mapStateToProps, mapDispatchToProps)(Lists);

export default ListsScreen;
