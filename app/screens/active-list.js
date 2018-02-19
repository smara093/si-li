import React from 'react';
import VisibleSimpleList from '../containers/VisibleSimpleList';

export default class ActiveList extends React.PureComponent {
  static navigationOptions = {
    // TODO: render the list's name
    title: 'my list',
  };

  render() {
    return <VisibleSimpleList />;
  }
}
