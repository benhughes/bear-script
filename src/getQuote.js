const fetch = require('node-fetch');

async function getQuote() {
  let quoteBlock;
  try {
    const result = await fetch('http://quotes.rest/qod.json?category=inspire');
    const {contents: {quotes}} = await result.json();
    const [{quote, author}] = quotes;
    quoteBlock = [`> ${quote}`, `/${author}/`];
  } catch (e) {
    quoteBlock = [''];
  }

  return quoteBlock.join('\n');
}

module.exports = getQuote;
