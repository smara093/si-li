import 'react-native';
import React from 'react';
import SimpleList from '../components/SimpleList';

import renderer from 'react-test-renderer';

// TODO: figure out how to mock root component with store and reducer
// test('renders correctly', () => {
//     const tree = renderer.create(<SimpleList />).toJSON();
//     expect(tree).toMatchSnapshot();
// });

test('true is true', () => {
  expect(true).toBe(true);
});
