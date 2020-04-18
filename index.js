require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(_, res) {res.send('Hello World');});
app.post('/command', async (req, res) => {
  const verificationToken = req.body.token;
  if (verificationToken != process.env.SLACK_VERIFICATION_TOKEN) {
    throw new Error('Invalid token');
  }

  const text = await req.body.text;
  const command = await req.body.command;
  const channel_id = await req.body.channel_id;

  switch(command) {
  case '/kintai':
    if (text === "s") {
      message = "開始します"
    } else if (text === "e") {
      message = "終了します"
    } else {
      message = "start? or end? or else?"
    }

    let data = {
      response_type: 'in_channel', 
      text: message,
    };
    return res.send(data);
  case '/test':
    break;
  }
  return res.status(200).send('running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
  console.log('Express server listening on port: ' + PORT);
});