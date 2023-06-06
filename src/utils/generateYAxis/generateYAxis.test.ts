import { generateYAxis } from "./generateYAxis";

describe("generateYAxis", () => {
    it("should generate y-axis labels for a small size", () => {
        const size = 3;
        const labels = generateYAxis(size);
        const expectedLabels = ["a", "b", "c"];
        expect(labels).toEqual(expectedLabels);
    });

    it("should generate y-axis labels for a medium size", () => {
        const size = 10;
        const labels = generateYAxis(size);
        const expectedLabels = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"
        ];
        expect(labels).toEqual(expectedLabels);
    });

    it("should generate y-axis labels for a large size", () => {
        const size = 26;
        const labels = generateYAxis(size);
        const expectedLabels = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
            "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
            "u", "v", "w", "x", "y", "z"
        ];
        expect(labels).toEqual(expectedLabels);
    });

    it("should generate y-axis labels for a size exceeding 26", () => {
        const size = 30;
        const labels = generateYAxis(size);
        const expectedLabels = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
            "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
            "u", "v", "w", "x", "y", "z", "aa", "ab", "ac", "ad"
        ];
        expect(labels).toEqual(expectedLabels);
    });
});
