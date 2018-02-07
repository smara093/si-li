import simpleListReducer from '../reducers/simpleListReducer';

test('can add item to list', () => {
  const initialState = { items: [{ text: 'item1' }] };
  const action = { type: 'ADD_LIST_ITEM', data: { text: 'new item' } };
  const result = simpleListReducer(initialState, action);
  expect(result.items).toHaveLength(2);
});

test('id is set correctly on newly added item', () => {
  const initialState = { items: [{ text: 'item1' }] };
  const action = { type: 'ADD_LIST_ITEM', data: { text: 'new item' } };
  const result = simpleListReducer(initialState, action);
  expect(result.items[1].id).toBe(1);
});

test('new item is added at the top of the list, ordered by date desc', () => {
  const initialState = { items: [{ text: 'item1', lastModified: new Date(2017, 12, 1), id: 0 }] };
  const action = {
    type: 'ADD_LIST_ITEM',
    data: { text: 'new item', lastModified: new Date(2018, 1, 1) },
  };
  const result = simpleListReducer(initialState, action);
  expect(result.items[0].id).toBe(1);
  expect(result.items[1].id).toBe(0);
});

test('new item value is reset upon adding the new item', () => {
  const initialState = {
    items: [
      {
        text: 'item1',
        id: 0,
      },
    ],
    newItem: 'this is a new item',
  };
  const action = {
    type: 'ADD_LIST_ITEM',
    data: { text: 'new item', lastModified: new Date(2018, 1, 1) },
  };
  const result = simpleListReducer(initialState, action);
  expect(result.newItem).toBe('');
});

test('can remove active list item', () => {
  const initialState = {
    items: [{ text: 'item1', isActive: true }, { text: 'item2', isActive: true }],
  };
  const action = { type: 'REMOVE_LIST_ITEM', data: 0 };
  const result = simpleListReducer(initialState, action);
  expect(result.items).toHaveLength(2);
  expect(result.items[1].isActive).toBe(false);
});

test('can remove inactive list item', () => {
  const initialState = {
    items: [{ text: 'item1', isActive: false }, { text: 'item2', isActive: true }],
  };
  const action = { type: 'REMOVE_LIST_ITEM', data: 0 };
  const result = simpleListReducer(initialState, action);
  expect(result.items).toHaveLength(1);
  expect(result.items[0]).toMatchObject({ text: 'item2', isActive: true });
});

test('order is preserved after removing an item, group by active status, order by active status asc, date desc', () => {
  const initialState = {
    items: [
      {
        text: 'item0',
        id: 0,
        lastModified: new Date(2018, 3, 1),
        isActive: true,
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
        lastModified: new Date(2017, 12, 12),
        isActive: false,
      },
    ],
  };
  const action = { type: 'REMOVE_LIST_ITEM', data: 0 };
  const result = simpleListReducer(initialState, action);
  expect(result.items).toHaveLength(4);
  expect(result.items[0]).toMatchObject({ id: 1, isActive: true });
  expect(result.items[1]).toMatchObject({ id: 2, isActive: true });
  expect(result.items[2]).toMatchObject({ id: 0, isActive: false });
  expect(result.items[3]).toMatchObject({ id: 3, isActive: false });
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

test('can clear the list of items', () => {
  const initialState = {
    items: [{ text: 'item1' }],
  };

  const action = { type: 'CLEAR_LIST' };

  const result = simpleListReducer(initialState, action);
  expect(result.items).toHaveLength(0);
});
