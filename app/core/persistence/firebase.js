import firebase from 'firebase';

// List items
async function addItemToList(item, list) {
  // assuming list exists, throw error if it does not
  return firebase
    .database()
    .ref(`users/${list.userId}/lists/${list.id}/items/`)
    .push()
    .set(item);
}

async function updateItem(item) {
  return firebase
    .database()
    .ref(`users/${item.userId}/lists/${item.listId}/items/${item.id}`)
    .set(item);
}

async function removeAllListItems(list) {
  return firebase
    .database()
    .ref(`users/${list.userId}/lists/${list.id}/items`)
    .remove();
}

async function removeItem(item) {
  const ref = firebase.database().ref(`users/${item.userId}/lists/${item.listId}/items/${item.id}`);
  return ref.remove();
}

// Lists
async function getLists(userId) {
  const ref = firebase.database().ref(`users/${userId}/lists`);

  return ref.once('value').then(
    (snapshot) => {
      const lists = snapshot.val();
      return Object.keys(lists || {}).map(key => ({
        ...lists[key],
        id: key,
        text: lists[key].name,
        isActive: true,
        userId,
        items: Object.keys(lists[key].items || {}).map(itemKey =>
          Object.assign(lists[key].items[itemKey] || {}, {
            id: itemKey,
            listId: key,
            userId,
          })),
      }));
    },
    (error) => {
      console.warn('getting lists for user failed', error);
    },
  );
}

async function addList(list, userId) {
  // assume user exists, throw error if it doesn't
  return firebase
    .database()
    .ref(`users/${userId}/lists`)
    .push()
    .set(list)
    .then(() => getLists(userId));
}

async function getList(userId, listId) {
  return firebase
    .database()
    .ref(`users/${userId}/lists/${listId}/`)
    .once('value')
    .then(snapshot => snapshot.val())
    .then(value => ({
      ...value,
      id: listId,
      userId,
      text: value.name,
      items: Object.keys(value.items || {}).map(key =>
        Object.assign(value.items[key], {
          id: key,
          listId,
          userId,
        })),
    }));
}

async function removeList(list) {
  console.log('removing list', list);
  return firebase
    .database()
    .ref(`users/${list.userId}/lists/${list.id}/`)
    .remove();
}

// Users
async function addUser(user) {
  return firebase
    .database()
    .ref(`users/${user.id}/`)
    .set(user);
}

export {
  addItemToList,
  updateItem,
  removeItem,
  removeAllListItems,
  getLists,
  addList,
  addUser,
  getList,
  removeList,
};
