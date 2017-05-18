const FormData = require('form-data');
const fetch = require('node-fetch');
const moment = require('moment');

const settings = require('../config.json');
const INBOX_ID = 177156204;

const generateTodoLine = ({content, due_date_utc}) =>
  `- ${content} ${due_date_utc ? moment(due_date_utc).fromNow() : ''}`;

async function getTodoistTodos() {
  try {
    const formData = new FormData();
    const data = {
      token: settings.todoistToken,
      sync_token: '*',
      resource_types: '["all"]',
    };

    for (const name in data) {
      formData.append(name, data[name]);
    }

    const result = await fetch('https://todoist.com/API/v7/sync', {
      method: 'POST',
      body: formData,
    });
    const response = await result.json();

    const inbox = response.items
      .filter(({project_id}) => project_id === INBOX_ID)
      .map(generateTodoLine)
      .join('\n');

    const due = response.items
      .filter(({due_date_utc}) => moment(due_date_utc).isSameOrBefore())
      .map(generateTodoLine)
      .join('\n');

    return {inbox, due};
  } catch (e) {
    return {inbox: '', due: ''};
  }
}

module.exports = getTodoistTodos;
