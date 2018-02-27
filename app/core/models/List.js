export default class List {
  constructor(id, userId, text, items, isActive, lastModified) {
    this.id = id;
    this.userId = userId;
    this.text = text;
    this.items = items;
    this.isActive = isActive;
    this.lastModified = lastModified;
  }
}
