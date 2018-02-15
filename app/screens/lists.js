import React from 'react';

import VisibleLists from '../containers/VisibleLists';

class ListsScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'my lists',
  };

  render() {
    return <VisibleLists />;
  }
}

export default ListsScreen;
