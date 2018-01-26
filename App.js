import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Button, ListView, TextInput } from 'react-native';

let rows = []
const now = Date.now();

for(let i=0;i<=20;i++){
    rows.push({key: now+i, text: `Item #${i}`, lastModified: now, isActive: true})}

const itemKeyExtractor = ({key}) => key

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

const sortByDateDesc = (a, b) =>{
  if(a.lastModified == b.lastModified) {
    return a.text.localeCompare(b.text);
  }

  return b.lastModified-a.lastModified;
}

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {items: groupArrayBy(rows.sort(sortByDateDesc), "isActive"), newItem:''}
  }

  removeItem = (index) => {
    this.state.items[index].isActive = false
    this.state.items[index].lastModified = Date.now()
    this.state.items.sort(sortByDateDesc);
    this.setState({items: groupArrayBy(this.state.items, "isActive"), newItem:this.state.newItem})
    this.forceUpdate()
  }

  renderItem = ({item, index})=>{
    return (
      <TouchableHighlight onLongPress={()=>{this.removeItem(index)}}>
        <View style={[styles.row, !item.isActive && styles.inactiveRow]}>
          <Text>{item.text}-{item.lastModified}-{item.isActive.toString()}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  addItem = ({text})=> {
    this.state.items.push({key: Date.now(), text: this.state.newItem, lastModified: Date.now(), isActive: true})  
    this.setState({items: groupArrayBy(this.state.items.sort(sortByDateDesc), "isActive"), newItem: ''})
    this.forceUpdate()
  }

  changeText = (text) => {
    this.setState({items: this.state.items, newItem: text})
  }

  render() {
    let newItemValue = ''
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Si[mple]-Li[st]</Text>  
        <TextInput 
          value={this.state.newItem} placeholder='type to add a new item' 
          onSubmitEditing={this.addItem} onChangeText={this.changeText} 
          underlineColorAndroid='transparent' style={styles.newItem}/>
        <Button title="Add" onPress={this.addItem}/>
        <FlatList
            data={this.state.items}
            renderItem={this.renderItem}
            keyExtractor={itemKeyExtractor}
            extraData={this.state}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25
  },
  title: {
    fontSize: 20,
    backgroundColor: 'pink',
    padding: 15,
    marginBottom: 5,
    alignItems: 'center'
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
    justifyContent: 'space-between'
  }, 
  inactiveRow: {
    backgroundColor: 'gray'
  },
  operator:{
    fontSize: 30,
    color: 'white',
    width: 30
  },
  newItem: {
    padding: 15
  }
});
