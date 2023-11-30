/* eslint-disable no-undef */
describe("service -> pokeman", () => {
  let fetch = global.fetch;
  beforeEach(() => {
    fetch = jest.fn();
  });
  it("should call pokeman api", () => {
    expect(fetch).toHaveBeenCalled();
  });
});
