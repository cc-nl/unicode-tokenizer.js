# Installation

Add a dependency to your package.json like this:

```
{
  ...,
  "dependencies": {
    ...,
    "unicode-tokenizer": "cc-nl/unicode-tokenizer.js"
  }
}
```

and run `npm install`.

# Usage

Require the package which exports a function. The function takes a String
returns an Array of tokens.

A token is an Object with a key of either 'separator', 'punctuation', 'number',
'symbol', 'word' or 'unknown', and a string as its value.

```
const tokenize = require('unicode-tokenizer');

for (const token of tokenize(process.argv[2]))
  if (token.word)
    console.log(token.word);
```
