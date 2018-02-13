import simpleListReducer from '../reducers/simpleListReducer';
import types from '../constants/actionTypes';

test('items are displayed in the correct order, group by active status, order by active status asc, date desc', () => {
  const items = [
    {
      text: 'item0',
      id: 0,
      lastModified: new Date(2018, 3, 1),
      isActive: false,
    },
    {
      text: 'item1',
      id: 1,
      lastModified: new Date(2018, 2, 1),
      isActive: true,
    },
    {
      text: 'item2',
      id: 2,
      lastModified: new Date(2018, 1, 1),
      isActive: true,
    },
    {
      text: 'item3',
      id: 3,
      lastModified: new Date(2017, 12, 12, 1, 0, 0),
      isActive: false,
    },
    {
      text: 'z-item3',
      id: 4,
      lastModified: new Date(2017, 12, 12, 1, 0, 0),
      isActive: false,
    },
  ];

  const action = { type: types.LIST_UPDATED, data: items };
  const result = simpleListReducer(undefined, action);

  expect(result.items).toHaveLength(5);
  expect(result.items[0]).toMatchObject({ id: 1, isActive: true });
  expect(result.items[1]).toMatchObject({ id: 2, isActive: true });
  expect(result.items[2]).toMatchObject({ id: 0, isActive: false });
  expect(result.items[3]).toMatchObject({ id: 3, isActive: false });
  expect(result.items[4]).toMatchObject({ id: 4, isActive: false });
});

test('can update the new item text without affecting the existing items', () => {
  const initialState = {
    items: [{ text: 'item1' }],
    newItem: 'Current Value',
  };

  const action = { type: 'UPDATE_TEXT', data: 'New Value' };

  const result = simpleListReducer(initialState, action);
  expect(result.items).toHaveLength(1);
  expect(result.newItem).toBe('New Value');
});

test('initial state and action have a default', () => {
  const result = simpleListReducer(undefined, { type: 'UNKNOWN' });

  expect(result).toMatchObject({ items: [], newItem: '' });
});
