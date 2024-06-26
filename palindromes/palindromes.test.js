const palindromes =  require('./palindromes');

const { isPalindromes, stringNormalizer, findPalindrome } = palindromes;

describe('isPalindrome()', () => {
  it('should return true when the string is a palindrome with even number of letters', () => {
    expect(isPalindromes('wowwow')).toBe(true);
  })

  it('should return true when the string is a palindrome with even number of letters', () => {
    expect(isPalindromes('wozow')).toBe(true);
  })

  it('should return false when the string is not a palindrome', () => {
    expect(isPalindromes('wowk')).toBe(false);
  })
})

describe('stringNormalizer()', () => {
  it('should change letters to lowercase', () => {
    expect(stringNormalizer('StarKy')).toBe('starky');
  })

  it('should remove whitespace and punctuation', () => {
    expect(stringNormalizer('starky, race car!')).toBe('starkyracecar');
  })
});

describe('findPalindrome()', () => {
  it('returns null when there is not a palindrome of length 3+', () => {
    expect(findPalindrome('abcdefg')).toBeNull();
    expect(findPalindrome('abbcdefg')).toBeNull();
  })

  it('returns a palindrome if it is at least length 3', () => {
    expect(findPalindrome('mam')).toEqual('mam');
  })


  it('returns the whole string if the whole string is a palindrome', () => {
    expect(findPalindrome('madam')).toEqual('madam');
  })

  it('returns a palindrome that starts at the beginning of the string', () => {
    expect(findPalindrome('racecarmadness')).toBe('racecar');
  })

  it('returns the longest palindrome substring when there are multiple', () => {
    expect(findPalindrome('raccarraccar')).toBe('raccarraccar');
  })
})

describe('palindromes()', () => {
  it('Correctly identifies single word palindromes', () => {
    expect(palindromes('madam')).toEqual(['madam']);
    expect(palindromes('racecar')).toEqual(['racecar']);
  })

  it('returns an empty array when given no palindromes', () => {
    expect(palindromes('tic tac toe')).toEqual([]);
  })

  it('ignores casing', () => {
    expect(palindromes('Wow')).toEqual(['wow']);
  })

  it('ignores punctuation', () => {
    expect(palindromes('yo, banana boy!')).toEqual(['yobananaboy']);
  })

  it('detects multi-word palindromes', () => {
    expect(palindromes("A man, a plan, a canal, Panama")).toEqual([
      "amanaplanacanalpanama",
    ]);
  });

  it('returns all palindromes that are not part of a another palindrome', () => {
    expect(palindromes('racecarmadam')).toEqual([
      'racecar',
      'madam',
    ])
  })
})
