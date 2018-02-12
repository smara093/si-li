import firebase from 'firebase';

export const config = {
  apiKey: 'AIzaSyDx-X19BZ7OLI9HSTbIc_MP2RUgvZeWtGY',
  authDomain: 'si-li-edb65.firebaseapp.com',
  databaseURL: 'https://si-li-edb65.firebaseio.com',
  projectId: 'si-li-edb65',
  storageBucket: 'si-li-edb65.appspot.com',
  messagingSenderId: '174488467647',
};

async function initData(dispatch) {
  console.log('loading lists now');

  const listsRef = firebase.database().ref('lists/');

  listsRef.on('value', (data) => {
    console.log('lists loaded');

    const listsObject = data.val();
    console.log(listsObject);
    const l = Object.keys(listsObject || {}).map(key => ({ ...listsObject[key], id: key }));
    dispatch({ type: 'LIST_UPDATED', data: l });
  });
}

async function saveItemToList(item, dispatch) {
  console.log('saving item to firebase');
  console.log(item);

  const ref = firebase.database().ref('lists/');

  ref
    .push()
    .set(item)
    .then(() => {
      console.log("I'm done saving");
    });
}

export { initData, saveItemToList };
