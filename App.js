import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Button, ListView, TextInput } from 'react-native';

let rows = []

for(let i=0;i<=20;i++)
  rows.push({key: i, text: `Item #${i}`})

const itemKeyExtractor = ({key}) => key

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {activeItems: rows, inactiveItems: [], newItem:''}
  }

  removeItem = (index) => {
    this.state.inactiveItems.push(this.state.activeItems.splice(index, 1))
    this.setState({activeItems: this.state.activeItems, inactiveItems: this.state.inactiveItems, newItem:this.state.newItem})
    this.forceUpdate()
  }

  renderItem = ({item, index})=>{
    console.log(`rendering item ${item.text} at index ${index}`)
    return (
      <TouchableHighlight onLongPress={()=>{this.removeItem(index)}}>
        <View style={styles.row}>
          <Text>{item.text}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  addItem = ({text})=> {
    console.log(`adding item ${text}`)
    this.state.activeItems.push({key: this.state.activeItems.length, text: this.newItem})  
    this.newItem = ''
    this.setState({activeItems: this.state.activeItems, inactiveItems: this.state.inactiveItems})
    this.forceUpdate()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Si[mple]-Li[st]</Text>  
        <TextInput placeholder='type to add a new item' onChangeText={(text) => this.newItem = text} underlineColorAndroid='transparent' style={styles.newItem}/>
        <Button title="Add" onPress={this.addItem}/>
        <FlatList
            data={this.state.activeItems}
            renderItem={this.renderItem}
            keyExtractor={itemKeyExtractor}
            extraData={this.state}/>
        <FlatList
            data={this.state.inactiveItems}
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
    backgroundColor: 'purple',
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
  operator:{
    fontSize: 30,
    color: 'white',
    width: 30
  },
  newItem: {
    padding: 15
  }
});
