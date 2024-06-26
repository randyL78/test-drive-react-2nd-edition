const palindromes = (str) => {
  const testStr = stringNormalizer(str)
  const palindromes = []

  for (let i = 0; i < testStr.length; i++) {
    const palindrome = findPalindrome(testStr.slice(i, testStr.length))

    if (palindrome) {
      palindromes.push(palindrome)
      i = i + palindrome.length - 1
    }
  }

  return palindromes
}

function isPalindrome(str) {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - i - 1]) return false;
  }

  return true;
}

function stringNormalizer(str) {
  return str.toLowerCase().replace(/\W/g, '');
}

function findPalindrome(str) {
  for (let i = str.length; i > 2; i--) {
    const subStr = str.slice(0, i);
    if (isPalindrome(subStr)) return subStr;
  }

  return null;
}

palindromes.findPalindrome = findPalindrome;
palindromes.isPalindromes = isPalindrome;
palindromes.stringNormalizer = stringNormalizer;

module.exports = palindromes;

