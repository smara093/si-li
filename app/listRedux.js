export const types = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    UPDATE_TEXT: 'UPDATE_TEXT'
  }

export const actionCreators = {
    add: (text) => {
        return { type: types.ADD, data: text }
    },
    remove: (index) => {
        return { type: types.REMOVE, data: index }
    },
    updateText: (text) => {
        return {type: types.UPDATE_TEXT, data: text}
    }
}
  
const initialState = { items: [], newItem: '' }

const sortByDateDesc = (a, b) =>{
    if(a.lastModified == b.lastModified) {
      return a.text.localeCompare(b.text);
    }
  
    return b.lastModified-a.lastModified;
  }

  const groupArrayBy = (arr, key) =>{
    let reduced = arr.reduce((r, current)=>{
      (r[current[key]] = r[current[key]] || []).push(current)
      return r
    }, {})
  
    let r = []
    const keys = Object.keys(reduced).sort().reverse();
    for(let i=0;i<keys.length;i++)
      r = r.concat(reduced[keys[i]])
     return r
  }  

export const reducer = (state = initialState, action) => {
  const {items, newItem} = state
  const {type, data} = action
  switch(type){
      case types.ADD: {
          return {
              ...state,
              items: groupArrayBy([...items, data].sort(sortByDateDesc), 'isActive'),
              newItem: ''
          }
      }
      case types.REMOVE: {
          items[data].isActive = false
          return {
            ...state,
            items: groupArrayBy([...items].sort(sortByDateDesc), 'isActive') 
          }
      }
      case types.UPDATE_TEXT: {
          return {
              ...state,
              newItem: data
          }  
      }
  }

  return state
}