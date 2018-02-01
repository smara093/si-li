import SimpleListManager from '../core/SimpleListManager';
import SimpleListItem from '../core/SimpleListItem';

const createItem = (text, date, isActive = true) => {
  const item = new SimpleListItem(text);
  item.lastModified = date;
  item.isActive = isActive;
  return item;
};

test('new empty object with default values can be created', () => {
  const sut = new SimpleListManager();
  expect(sut.items).toMatchObject([]);
});

test('new object can be created', () => {
  const sut = new SimpleListManager([new SimpleListItem('item1'), new SimpleListItem('item2')]);
  expect(sut.items).toMatchObject([new SimpleListItem('item1'), new SimpleListItem('item2')]);
});

test('can add a new item to the list', () => {
  const sut = new SimpleListManager([new SimpleListItem('item1'), new SimpleListItem('item2')]);
  sut.addItem('item3');
  expect(sut.items[2].text).toBe('item3');
});

test('can remove an item from the list', () => {
  const sut = new SimpleListManager([new SimpleListItem('item1'), new SimpleListItem('item2')]);
  sut.removeItem(1);
  expect(sut.items[1].isActive).toBe(false);
  expect(sut.items[1].lastModified).toBeLessThanOrEqual(Date.now());
  expect(sut.items[1].lastModified).toBeGreaterThanOrEqual(sut.items[0].lastModified);
});

test('can get items ordered by lastModified', () => {
  const sut = new SimpleListManager([
    createItem('item3', new Date(2017, 1, 1)),
    createItem('item1', new Date(2017, 12, 12)),
    createItem('item2', new Date(2017, 6, 6)),
    createItem('item0', new Date(2018, 1, 1)),
  ]);

  expect(sut.orderedItems[0].text).toBe('item0');
  expect(sut.orderedItems[1].text).toBe('item1');
  expect(sut.orderedItems[2].text).toBe('item2');
  expect(sut.orderedItems[3].text).toBe('item3');
});

test('can get items grouped by active status and ordered by dateModified', () => {
  const sut = new SimpleListManager([
    createItem('item3', new Date(2017, 1, 1), false),
    createItem('item1', new Date(2017, 12, 12), false),
    createItem('item2', new Date(2017, 6, 6)),
    createItem('item0', new Date(2018, 1, 1), false),
  ]);

  expect(sut.orderedItems[0].text).toBe('item2');
  expect(sut.orderedItems[1].text).toBe('item0');
  expect(sut.orderedItems[2].text).toBe('item1');
  expect(sut.orderedItems[3].text).toBe('item3');
});
