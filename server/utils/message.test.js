let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe("Generate Message", () => {
    it("should return correct message", () => {
       let from = "ej";
       let text = "some text";
       let message = generateMessage(from, text);

       expect(message.createdAt).toBeA('number');
       expect(message).toInclude({from, text});
    });
});

describe("Generate Location Message", () => {
    it("should return correct location message", () => {
        let from = "ej";
        let latitude = 15;
        let longitude = 19;
        let url =  'https://www.google.com/maps?q=15,19';
        let message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});