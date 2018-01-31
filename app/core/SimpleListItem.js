export default class SimpleListItem {
    constructor(text = "") {
        this.text = text;
        this.isActive = true;
        this.lastModified = Date.now(); 
    }
}