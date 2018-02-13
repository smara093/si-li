/* eslint import/prefer-default-export: 0 */

/*
* Sorts an array of items by dateModified desc and groups by isActive, isActive = true first.
*/
export const getOrderedItems = (items) => {
  const dateDescCompare = (a, b) => {
    if (a.lastModified.valueOf() === b.lastModified.valueOf()) {
      return a.text.localeCompare(b.text);
    }

    return b.lastModified - a.lastModified;
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

  return groupBy(items.sort(dateDescCompare), 'isActive');
};
