import SimpleList from '../core/SimpleList'
test('new empty object with default values can be created', ()=>{
    let sut = new SimpleList();
    expect(sut.items).toMatchObject([]) 
});

test('new object can be created', () => {
    let sut = new SimpleList(["item1", "item2"]);
    expect(sut.items).toMatchObject(["item1", "item2"]);
});