const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.getCurrentUsers = (req, res) => User.findById(req.params.id)
.then((user) => {
  if (!user) {
    return res.status(404).send({ message: 'Пользователь не найден' });
  } return res.status(200).send({ data: user });
})
.catch((e) => {
  if (e.name === 'CastError') {
    return res.status(400).send({ mussage: 'Некорректные данные' });
  } return res.status(500).send({ message: 'Произошла ошибка' });
});

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body; // получим из объекта запроса имя и описание пользователя
  User.create({ name, about, avatar }) // создадим документ на основе пришедших данных
  .then((user) => res.status(201).send({ data: user }))
  .catch((e) => {
    if (e.name === 'ValidationError') {
      return res.status(400).send({ message: 'Некорректные данные' });
    }
    return res.status(500).send({ message: 'Произошла ошибка' });
  })
}

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name, about }),
  {
    new: true,
    runValidators: true,
  }
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Пользователь не найден' });
    } return res.status(200).send({ data: user });
  })
  .catch((e) => {
    if (e.name === 'ValidationError') {
      return res.status(400).send({ message: 'Некорректные данные' });
    }
    return res.status(500).send({ message: 'Произошла ошибка' });
  });
}

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Пользователь не найден' });
    } return res.status(200).send({ data: user });
  })
  .catch((e) => {
    if (e.name === 'ValidationError') {
      return res.status(400).send({ message: 'Некорректные данные' });
    } return res.status(500).send({ message: 'Произошла ошибка' });
  });
}