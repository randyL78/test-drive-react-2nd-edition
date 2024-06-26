const palindromes =  require('./palindromes');

describe('palindromes()', () => {
  it('Correctly identifies single word palindromes', () => {
    expect(palindromes('madam')).toEqual(['madam']);
  })
})
