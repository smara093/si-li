import React from 'react';
import VisibleSimpleList from '../containers/VisibleSimpleList';

export default class ActiveList extends React.PureComponent {
  static navigationOptions = {
    title: 'my list',
  };

  render() {
    return <VisibleSimpleList />;
  }
}
