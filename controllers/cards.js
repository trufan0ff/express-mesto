const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
  Card.find({})
  .then(card => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      } return res.status(500).send({ message: 'Произошла ошибка' });
    })
}

module.exports.deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Карточка не найдена' });
    } return res.status(200).send({ data: card });
  })
  .catch((e) => {
    if (e.name === 'CastError') {
      return res.status(400).send({ message: 'Некорректные данные' });
    } return res.status(500).send({ message: 'Произошла ошибка' });
  })

module.exports.likeCard = (req, res) =>  Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true })
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Несуществующий id' })
    } return res.status(200).send({ data: card })
  })
  .catch((e) => {
    if (e.name === 'CastError') {
      return res.status(400).send({ message: 'Некорректные данные' })
    }
    return res.status(500).send({ message: 'Произошла ошибка' })
  })



module.exports.dislikeCard = (req, res) =>  Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },)
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Несуществующий id' })
    } return res.status(200).send({ data: card })
  })
  .catch((e) => {
    if (e.name === 'CastError') {
      return res.status(400).send({ message: 'Некорректные данные' })
    }
    return res.status(500).send({ message: 'Произошла ошибка' })
  })

