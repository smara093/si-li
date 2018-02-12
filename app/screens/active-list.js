import React from 'react';
import VisibleSimpleList from '../containers/VisibleSimpleList';
class ActiveList extends React.PureComponent {
  static navigationOptions = {
    title: 'my list',
  };

  render() {
    return <VisibleSimpleList />;
  }
}

export default ActiveList;
