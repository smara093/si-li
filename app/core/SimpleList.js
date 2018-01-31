import SimpleListItem from "./SimpleListItem";

export default class SimpleList {
    constructor(items = []) {
        this.items = items;
    }

    addItem = function(text){
        this.items.push(new SimpleListItem(text));
    }

    removeItem = function(index){
        this.items[index].isActive = false;
        this.items[index].lastModified = Date.now();
    }
}