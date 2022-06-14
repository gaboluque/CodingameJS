/*
Problem Statement
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.

Constraints
- 1 ≤ s.length ≤ 104
- s consists of parentheses only '()[]{}'.


Example 1:
s = "()"
Output: true

Example 2:
s = "()[]{}"
Output: true

Example 3:
s = "(]"
Output: false

Example 4:
s = "([)]"
Output: false

Example 5:
s = "{[]}"
Output: true
*/


const isValid = (s) => {
  // Stack to store left symbols
  const leftSymbols = [];
  const arr = s.split('');
  // Loop for each character of the string
  arr.forEach((char) => {

    // If left symbol is encountered
    if (char === '(' || char === '{' || char === '[')  leftSymbols.push(char);
    
    const leftSymbolsLength = leftSymbols.length;
    if(!leftSymbolsLength) return false;

    const lastLeftSymbol = leftSymbols[leftSymbolsLength - 1];
  
    // If right symbol is encountered
    if (char === ')' && lastLeftSymbol === '(') {
        leftSymbols.pop();
    } else if (char === '}' && lastLeftSymbol === '{') {
        leftSymbols.pop();
    } else if (char === ']' && lastLeftSymbol === '[') {
        leftSymbols.pop();
    }
    // If none of the valid symbols is encountered
    else {
        return false;
    }

  });

  // If stack is empty, then all the symbols are matched
  return leftSymbols.length === 0;
};

console.log("Test 1", isValid('({()}{})')); // true
