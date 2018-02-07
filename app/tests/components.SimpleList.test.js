// import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import SimpleList from '../components/SimpleList';

test('renders correctly', () => {
  const tree = renderer.create(<SimpleList />).toJSON();
  expect(tree).toMatchSnapshot();
});
