const router = require('express').Router();
const users = require('../controllers/users');

router.post('/users', users.createUser);

router.get('/users/:userId', users.getCurrentUsers);

router.get('/users', users.getUsers)

router.patch('/users/me', users.updateProfile)

router.patch('/users/me/avatar', users.updateAvatar)

module.exports = router;