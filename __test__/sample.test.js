// * DOCS: https://jestjs.io/docs/en/api
describe('sample test 101', () => {
  it('works as expected', () => {
    const age = 100;
    expect(1).toEqual(1);
    expect(age).toEqual(100);
  });

  it('handle ranges just fine', () => {
    const age = 200;
    expect(age).toBeGreaterThan(100);
  });
  
  // 'fit' will skip the previous tests
  fit('makes a list of dog names', () => {
    const dogs = ['bill', 'bet'];
    expect(dogs).toEqual(dogs);
    expect(dogs).toContain('bill');
    expect(dogs).toContain('bet');
  });
});