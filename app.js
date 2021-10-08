const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '61561cb73bda543d7576f342' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});


app.use('/users', users);

app.use('/cards', cards);

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    app.listen(PORT, () => console.log(`App listining on port: >>> ${PORT} <<<`));
  } catch (e) {
    console.log('Server ERROR: >>>', e.message);
    process.exit(1);
  }
}
start();