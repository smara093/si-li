import SimpleList from "../core/SimpleList";
import SimpleListItem from "../core/SimpleListItem";
import { Date } from "core-js/library/web/timers";
test("new empty object with default values can be created", () => {
  let sut = new SimpleList();
  expect(sut.items).toMatchObject([]);
});

test("new object can be created", () => {
  let sut = new SimpleList([
    new SimpleListItem("item1"),
    new SimpleListItem("item2")
  ]);
  expect(sut.items).toMatchObject([
    new SimpleListItem("item1"),
    new SimpleListItem("item2")
  ]);
});

test("can add a new item to the list", () => {
  let sut = new SimpleList([
    new SimpleListItem("item1"),
    new SimpleListItem("item2")
  ]);
  sut.addItem("item3");
  expect(sut.items[2].text).toBe("item3");
});

test("can remove an item from the list", () => {
    let sut = new SimpleList([
      new SimpleListItem("item1"),
      new SimpleListItem("item2")
    ]);
    sut.removeItem(1);
    expect(sut.items[1].isActive).toBe(false);
    expect(sut.items[1].lastModified).toBeLessThanOrEqual(Date.now());
    expect(sut.items[1].lastModified).toBeGreaterThanOrEqual(sut.items[0].lastModified);
  });

  test("can sort items by lastModified", () => {
      const createItem = (text, date) => {
          let item = new SimpleListItem(text);
          item.lastModified = date;
          return item;
      };

    let sut = new SimpleList([
        createItem("item3", new Date(2017, 1, 1),
        createItem("item1", new Date(2017, 12, 12)),
        createItem("item2", new Date(2017, 6, 6)),
        createItem("item0", new Date(2018, 1, 1))
    ]);

    sut.sortByDateDesc();

    expect(sut.items[0].text).toBe("item0");
  });
