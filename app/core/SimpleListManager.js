import SimpleListItem from './SimpleListItem';

const sortByDateDesc = (arr) => {
  const dateDescCompare = (a, b) => {
    if (a.lastModified === b.lastModified) {
      return a.text.localeCompare(b.text);
    }

    return b.lastModified - a.lastModified;
  };

  return arr.sort(dateDescCompare);
};

const groupBy = (arr, key) => {
  const reduced = arr.reduce((acc, current) => {
    (acc[current[key]] = acc[current[key]] || []).push(current);
    return acc;
  }, {});

  let r = [];
  const keys = Object.keys(reduced)
    .sort()
    .reverse();
  for (let i = 0; i < keys.length; i += 1) r = r.concat(reduced[keys[i]]);
  return r;
};

export default class SimpleListManager {
  constructor(items = []) {
    this.items = items;
  }

  get orderedItems() {
    return groupBy(sortByDateDesc(this.items), 'isActive');
  }

  addItem(text) {
    this.items.push(new SimpleListItem(text, true, this.items.length));
  }

  removeItem(index) {
    this.items[index].isActive = false;
    this.items[index].lastModified = Date.now();
  }

  clear() {
    this.items = [];
  }
}
