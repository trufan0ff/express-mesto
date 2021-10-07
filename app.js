const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '61561cb73bda543d7576f342' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};

app.use('/users', users);

app.use('/cards', cards);

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})