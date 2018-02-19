import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SimpleList from '../components/SimpleList';

configure({ adapter: new Adapter() });

let list;
let onAddItemSpy;
let onChangeTextSpy;
let onClearItemsClickSpy;
let onRemoveItemSpy;
let onComponentInitSpy;

beforeEach(() => {
  list = {
    items: [
      {
        text: 'item 1',
        isActive: true,
        lastModified: '2017-02-01T01:00:00.000Z',
        id: 1,
      },
    ],
  };
  onAddItemSpy = jest.fn();
  onChangeTextSpy = jest.fn();
  onClearItemsClickSpy = jest.fn();
  onRemoveItemSpy = jest.fn();
  onComponentInitSpy = jest.fn();
});

test('renders correctly', () => {
  const tree = renderer
    .create(<SimpleList
      list={list}
      newItem=""
      onAddItemClick={onAddItemSpy}
      onChangeText={onChangeTextSpy}
      onClearItemsClick={onClearItemsClickSpy}
      onRemoveItem={onRemoveItemSpy}
      onComponentInit={onComponentInitSpy}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('add item function is called when adding an item', () => {
  const wrapper = shallow(<SimpleList
    list={list}
    newItem="test"
    onAddItemClick={onAddItemSpy}
    onChangeText={onChangeTextSpy}
    onClearItemsClick={onClearItemsClickSpy}
    onRemoveItem={onRemoveItemSpy}
    onComponentInit={onComponentInitSpy}
  />);

  wrapper.find('Button[title="Add"]').simulate('press');

  expect(onAddItemSpy.mock.calls).toHaveLength(1);
  expect(onAddItemSpy.mock.calls[0][0]).toBe('test');
});

test('clear items function is called when pressing the button', () => {
  const wrapper = shallow(<SimpleList
    list={list}
    newItem=""
    onAddItemClick={onAddItemSpy}
    onChangeText={onChangeTextSpy}
    onClearItemsClick={onClearItemsClickSpy}
    onRemoveItem={onRemoveItemSpy}
    onComponentInit={onComponentInitSpy}
  />);

  wrapper.find('Button[title="Clear Items"]').simulate('press');

  expect(onClearItemsClickSpy.mock.calls).toHaveLength(1);
});

test('the change text function is called when updating the new item text', () => {
  const wrapper = shallow(<SimpleList
    list={list}
    newItem=""
    onAddItemClick={onAddItemSpy}
    onChangeText={onChangeTextSpy}
    onClearItemsClick={onClearItemsClickSpy}
    onRemoveItem={onRemoveItemSpy}
    onComponentInit={onComponentInitSpy}
  />);

  wrapper.find('TextInput').simulate('changeText', 'new text');

  expect(onChangeTextSpy.mock.calls).toHaveLength(1);
  expect(onChangeTextSpy.mock.calls[0][0]).toBe('new text');
});

test('the new item is added on submit', () => {
  const wrapper = shallow(<SimpleList
    list={list}
    newItem="a very new item"
    onAddItemClick={onAddItemSpy}
    onChangeText={onChangeTextSpy}
    onClearItemsClick={onClearItemsClickSpy}
    onRemoveItem={onRemoveItemSpy}
    onComponentInit={onComponentInitSpy}
  />);

  wrapper.find('TextInput').simulate('submitEditing');

  expect(onAddItemSpy.mock.calls).toHaveLength(1);
  expect(onAddItemSpy.mock.calls[0][0]).toBe('a very new item');
});

test('data is initialized on load', () => {
  shallow(<SimpleList
    items={list}
    newItem="a very new item"
    onAddItemClick={onAddItemSpy}
    onChangeText={onChangeTextSpy}
    onClearItemsClick={onClearItemsClickSpy}
    onRemoveItem={onRemoveItemSpy}
    onComponentInit={onComponentInitSpy}
  />);

  expect(onComponentInitSpy.mock.calls).toHaveLength(1);
});
