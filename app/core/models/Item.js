export default class Item {
  constructor(id, text, isActive, lastModified, listId, userId) {
    this.id = id;
    this.text = text;
    this.isActive = isActive;
    this.lastModified = lastModified;
    this.listId = listId;
    this.userId = userId;
  }
}
