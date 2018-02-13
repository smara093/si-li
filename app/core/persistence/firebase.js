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

export { initData, saveItemToList, updateItem, removeItem, clearList };
