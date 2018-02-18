import firebase from 'firebase';

// List items
async function addItemToList(item, list) {
  console.log('saving item', item);
  console.log('to list', list);
  const userId = list.userId;
  const listId = list.id;

  // assuming list exists, throw error if it does not
  return firebase
    .database()
    .ref(`users/${userId}/lists/${listId}/items/`)
    .push()
    .set(item);
}

async function updateItem(item) {
  const ref = firebase.database().ref(`lists/${item.listId}/items`);
  return ref.set(item);
}

function removeAllListItems(list) {
  const ref = firebase.database().ref(`lists/${list.id}/items`);
  ref.remove();
}

function removeItem(item) {
  const ref = firebase.database().ref(`lists/${item.listId}/items/${item.id}`);
  ref.remove();
}

// Lists
async function getLists(userId) {
  console.log('getting lists for user', userId);

  const ref = firebase.database().ref(`users/${userId}/lists`);

  return ref.once('value').then(
    (snapshot) => {
      const lists = snapshot.val();
      console.log('loaded lists: ', lists);
      return Object.keys(lists || {}).map(key => ({
        ...lists[key],
        id: key,
        text: lists[key].name,
        isActive: true,
        userId,
      }));
    },
    (error) => {
      console.log('getting lists for user failed', error);
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
    .then((value) => {
      console.log('retrieved list', listId);

      return {
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
      };
    });
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
};
