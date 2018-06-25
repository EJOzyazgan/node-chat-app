const expect = require('expect');
const {isRealString} = require('./validation');

describe("isRealString", () => {
   it("should reject non-string", () => {
        let res = isRealString(98);
        expect(res).toBe(false);
   });

    it("should reject string with only spaces", () => {
        let res = isRealString("        ");
        expect(res).toBe(false);
    });

    it("should allow string with non-string character", () => {
        let res = isRealString("  EJ      ");
        expect(res).toBe(true);
    });
});