const router = require('express').Router();

router.post('/users', createUser);

router.get('/users/:userId', getCurrentUsers);

router.get('/users', getUsers)

router.patch('/users/me', updateProfile)

router.patch('/users/me/avatar', updateAvatar)

module.exports = router;