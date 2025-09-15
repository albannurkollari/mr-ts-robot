import { hello } from "#utils";

describe("hello util", () => {
  it("returns a greeting with the given name", () => {
    expect(hello("Mr Robot")).toBe("Hello, Mr Robot!");
  });
});
