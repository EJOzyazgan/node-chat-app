let expect = require('expect');

let {generateMessage} = require('./message');

describe("Generate Message", () => {
    it("should return correct message", () => {
       let from = "ej";
       let text = "some text";
       let message = generateMessage(from, text);

       expect(message.createdAt).toBeA('number');
       expect(message).toInclude({from, text});
    });
});