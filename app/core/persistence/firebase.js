import firebase from 'firebase';

function initData(dispatch) {
  const listsRef = firebase.database().ref('lists/');

  listsRef.on('value', (data) => {
    const listsObject = data.val();
    const l = Object.keys(listsObject || {}).map(key => ({ ...listsObject[key], id: key }));
    dispatch({ type: 'LIST_UPDATED', data: l });
  });
}

function saveItemToList(item) {
  const ref = firebase.database().ref('lists/');

  ref.push().set(item);
}

function updateItem(item) {
  const ref = firebase.database().ref(`lists/${item.id}`);
  ref.set(item);
}

function clearList() {
  const ref = firebase.database().ref('lists/');

  ref.set({});
}

function removeItem(item) {
  const ref = firebase.database().ref(`lists/${item.id}`);
  ref.remove();
}

async function loadLists(user) {
  return firebase
    .database()
    .ref(`users/${user}/lists`)
    .once('value')
    .then((snapshot) => {
      const lists = snapshot.val();
      return Object.keys(lists || {}).map(key => ({
        ...lists[key],
        id: key,
        text: lists[key].name,
        isActive: true,
      }));
    });
}

async function addList(list, owner) {
  const ownerId = owner.id;

  return firebase
    .database()
    .ref(`users/${ownerId}/`)
    .once('value')
    .then(snapshot => (snapshot && snapshot.val()) || null)
    .then((user) => {
      if (user) {
        return firebase
          .database()
          .ref(`users/${ownerId}/lists`)
          .push()
          .set(list);
      }

      return firebase
        .database()
        .ref(`users/${ownerId}`)
        .set({ lists: [list] });
    })
    .then(() => loadLists(ownerId));
}

export { initData, saveItemToList, updateItem, removeItem, clearList, loadLists, addList };
