const express = require('express');
const { addUser, updateUser } = require('../controllers/user');

const router = express.Router();

router.post('/', addUser);
router.put('/:id', updateUser);

module.exports = router;
