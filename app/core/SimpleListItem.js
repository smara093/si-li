export default class SimpleListItem {
  constructor(text = '', isActive = true, id = 0) {
    this.text = text;
    this.isActive = isActive;
    this.lastModified = Date.now();
    this.id = id;
  }
}
