 
test("Hello world", () => { 
    const ret = require('../index')
    expect(ret).toBe('Hello World')
});