const tokenize = require('./unicode-tokenizer');

for (const token of tokenize(process.argv[2]))
  if (token.word)
    console.log(token.word);
