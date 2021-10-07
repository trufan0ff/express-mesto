const router = require('express').Router();

router.post('/users', createCard);

router.get('/cards/:cardId', getCurrentCard);

router.get('/cards', getCards)

router.put('/cards/:cardId/likes', likeCard)

router.delete('/cards/:cardId/likes', dislikeCard)

module.exports = router;