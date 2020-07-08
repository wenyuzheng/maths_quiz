import AnsCorrectness from "../AnsCorrectness";

// 0 = undefined, 1 = correct, -1 = incorrect

describe( "AnsCorrectness", () => {
    it("Eg 1, return 1", () => {
        const result = AnsCorrectness("15", "15");
        expect(result).toEqual(1);
    })

    it("Eg 2, return 0", () => {
        const result = AnsCorrectness("1", "15");
        expect(result).toEqual(0);
    })

    it("Eg 3, return 0", () => {
        const result = AnsCorrectness("", "15");
        expect(result).toEqual(0);
    })

    it("Eg 4, return -1", () => {
        const result = AnsCorrectness("13", "15");
        expect(result).toEqual(-1);
    })

    it("Eg 5, return -1", () => {
        const result = AnsCorrectness("2", "15");
        expect(result).toEqual(-1);
    })

    it("Eg 6, return -1", () => {
        const result = AnsCorrectness("152", "15");
        expect(result).toEqual(-1);
    })
})