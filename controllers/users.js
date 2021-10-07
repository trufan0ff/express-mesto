const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.getCurrentUsers = (req, res) => {
  User.findById(req.user.id)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body; // получим из объекта запроса имя и описание пользователя
  User.create({ name, about, avatar }) // создадим документ на основе пришедших данных
  .catch ((arr) => res.status(500).send({ message: 'Произошла ошибка' }))
}

module.exports.updateProfile = (req, res) => {
  User.updateOne({ name, about })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true },
  )
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}