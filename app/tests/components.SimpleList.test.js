// import 'react-native';
import React from 'react';
import { Button } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import SimpleList from '../components/SimpleList';

// setup
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let items;
let onAddItemSpy;
let onChangeTextSpy;
let onClearItemsClickSpy;
let onRemoveItemSpy;

beforeEach(() => {
  items = [
    {
      text: 'item 1',
      isActive: true,
      lastModified: new Date(2017, 1, 1),
      id: 1,
    },
  ];
  onAddItemSpy = jest.fn();
  onChangeTextSpy = jest.fn();
  onClearItemsClickSpy = jest.fn();
  onRemoveItemSpy = jest.fn();
});

test('renders correctly', () => {
  const tree = renderer
    .create(<SimpleList
      items={items}
      newItem=""
      onAddItemClick={onAddItemSpy}
      onChangeText={onChangeTextSpy}
      onClearItemsClick={onClearItemsClickSpy}
      onRemoveItem={onRemoveItemSpy}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('add item function is called when adding an item', () => {
  const wrapper = shallow(<SimpleList
    items={items}
    newItem="test"
    onAddItemClick={onAddItemSpy}
    onChangeText={onChangeTextSpy}
    onClearItemsClick={onClearItemsClickSpy}
    onRemoveItem={onRemoveItemSpy}
  />).dive();

  wrapper.find('Button[title="Add"]').simulate('press');

  expect(onAddItemSpy.mock.calls).toHaveLength(1);
  expect(onAddItemSpy.mock.calls[0][0]).toBe('test');
});

test('clear items function is called when pressing the button', () => {
  const wrapper = shallow(<SimpleList
    items={items}
    newItem=""
    onAddItemClick={onAddItemSpy}
    onChangeText={onChangeTextSpy}
    onClearItemsClick={onClearItemsClickSpy}
    onRemoveItem={onRemoveItemSpy}
  />).dive();

  wrapper.find('Button[title="Clear Items"]').simulate('press');

  expect(onClearItemsClickSpy.mock.calls).toHaveLength(1);
});

test('the change text function is called when updating the new item text', () => {
  const wrapper = shallow(<SimpleList
    items={items}
    newItem=""
    onAddItemClick={onAddItemSpy}
    onChangeText={onChangeTextSpy}
    onClearItemsClick={onClearItemsClickSpy}
    onRemoveItem={onRemoveItemSpy}
  />).dive();

  wrapper.find('TextInput').simulate('changeText', 'new text');

  expect(onChangeTextSpy.mock.calls).toHaveLength(1);
  expect(onChangeTextSpy.mock.calls[0][0]).toBe('new text');
});

test('the new item is added on submit', () => {
  const wrapper = shallow(<SimpleList
    items={items}
    newItem="a very new item"
    onAddItemClick={onAddItemSpy}
    onChangeText={onChangeTextSpy}
    onClearItemsClick={onClearItemsClickSpy}
    onRemoveItem={onRemoveItemSpy}
  />).dive();

  wrapper.find('TextInput').simulate('submitEditing');

  expect(onAddItemSpy.mock.calls).toHaveLength(1);
  expect(onAddItemSpy.mock.calls[0][0]).toBe('a very new item');
});
