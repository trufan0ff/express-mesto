const router = require('express').Router();
const cards = require('../controllers/cards');

router.post('/users', cards.createCard);

router.get('/cards/:cardId', cards.getCurrentCard);

router.get('/cards', cards.getCards)

router.put('/cards/:cardId/likes', cards.likeCard)

router.delete('/cards/:cardId/likes', cards.dislikeCard)

module.exports = router;