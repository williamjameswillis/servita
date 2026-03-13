describe('test project', () => {  
  it(' setup', () => {
    const bigNumber = 10;

    const littleNumber = 5;

    expect(bigNumber).toBeGreaterThan(littleNumber);
  });
});