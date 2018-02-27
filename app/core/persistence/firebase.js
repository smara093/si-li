import firebase from 'firebase';
import User from '../models/User';
import List from '../models/List';
import Item from '../models/Item';

// List items
export async function addItemToList(item, list) {
  // assuming list exists, throw error if it does not
  return firebase
    .database()
    .ref(`users/${list.userId}/lists/${list.id}/items/`)
    .push()
    .set(item);
}

export async function updateItem(item) {
  return firebase
    .database()
    .ref(`users/${item.userId}/lists/${item.listId}/items/${item.id}`)
    .set(item);
}

export async function removeAllListItems(list) {
  return firebase
    .database()
    .ref(`users/${list.userId}/lists/${list.id}/items`)
    .remove();
}

export async function removeItem(item) {
  const ref = firebase.database().ref(`users/${item.userId}/lists/${item.listId}/items/${item.id}`);
  return ref.remove();
}

// Lists
export async function getLists(userId) {
  const ref = firebase.database().ref(`users/${userId}/lists`);

  return ref.once('value').then(
    (snapshot) => {
      const lists = snapshot.val();
      return Object.keys(lists || {}).map(key =>
        new List(
          key,
          userId,
          lists[key].name,
          Object.keys(lists[key].items || {}).map((itemKey) => {
            const value = lists[key].items[itemKey];
            return new Item(itemKey, value.text, value.isActive, value.lastModified, key, userId);
          }),
          true,
          lists[key].lastModified,
        ));
    },
    (error) => {
      console.warn('getting lists for user failed', error);
    },
  );
}

export async function addList(list, userId) {
  // assume user exists, throw error if it doesn't
  return firebase
    .database()
    .ref(`users/${userId}/lists`)
    .push()
    .set(list)
    .then(() => getLists(userId));
}

export async function getList(userId, listId) {
  return firebase
    .database()
    .ref(`users/${userId}/lists/${listId}/`)
    .once('value')
    .then(snapshot => snapshot.val())
    .then(value =>
      new List(
        listId,
        userId,
        value.name,
        Object.keys(value.items || {}).map(key =>
          new Item(
            key,
            value.items[key].text,
            value.items[key].isActive,
            value.items[key].lastModified,
            listId,
            userId,
          )),
        value.isActive,
        value.lastModified,
      ));
}

export async function removeList(list) {
  return firebase
    .database()
    .ref(`users/${list.userId}/lists/${list.id}/`)
    .remove();
}

// Users
export async function addUser(user) {
  return firebase
    .database()
    .ref(`users/${user.id}/`)
    .set(user);
}

// Authentication
export function signInWithEmailAndPassword(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(value => new User(value.uid, value.email));
}

export function createUserWithEmailAndPassword(email, password) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(value => new User(value.uid, value.email));
}
