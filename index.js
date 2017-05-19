const opn = require('opn');
const {URLSearchParams} = require('url');
const moment = require('moment');
const getQuote = require('./src/getQuote');
const getTodoistTodos = require('./src/getTodoistTodos');

let BEAR_NOTE = '862EBEB3-EF8A-4D37-9806-770CFE8525D0-4846-000002CC22CF7411';
if (process.env.NODE_ENV === 'development') {
  BEAR_NOTE = '405CF49F-F19C-4ED9-A70E-51F36657FA9C-1762-0000106750046D9C';
}

async function main() {
  const quoteBlock = await getQuote();
  const {inbox, due} = await getTodoistTodos();

  const noteText = `
*${moment().format('Do MMMM')}*

${quoteBlock}

## Daily 💁
- Check [📝 Scratch Pad](bear://x-callback-url/open-note?id=96642786-147F-464C-A11F-0EB74F28E291-4584-000002C15FD934DB)
- Check [Phabricator](https://phabricator.thomac.net)
- Transfer Emails to tasks and get to inbox zero
- Clear [Todoist inbox](https://en.todoist.com/app?lang=en&v=862#project%2F177156204)
- Check Todoist 
- Clear yesterday
- Check Slack
- Create tasks for today

## Todoist 

### Inbox
[link](https://en.todoist.com/app?lang=en&v=866#project%2F177156204)
${inbox}

### Due
[link](https://en.todoist.com/app?lang=en&v=866#agenda%2Foverdue%2C%20today)
${due}

## Todo ✅ 

## Notes 📝 

---

## Yesterday🏅


`;

  const params = new URLSearchParams({
    text: noteText,
    id: BEAR_NOTE,
    mode: 'prepend',
  });

  opn(
    'bear://x-callback-url/add-text?' + params.toString().replace(/\+/g, '%20'),
    {wait: false}
  );
}
main();
