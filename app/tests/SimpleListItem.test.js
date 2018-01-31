import SimpleListItem from '../core/SimpleListItem'

test("can create a new object with default values", ()=>{
    const sut = new SimpleListItem();
    expect(sut.text).toBe("");
    expect(sut.isActive).toBe(true);
    expect(sut.lastModified).toBeLessThanOrEqual(Date.now());
})

test("can create a new object", ()=>{
    const sut = new SimpleListItem("my cool item");
    expect(sut.text).toBe("my cool item");
    expect(sut.isActive).toBe(true);
    expect(sut.lastModified).toBeLessThanOrEqual(Date.now());
})