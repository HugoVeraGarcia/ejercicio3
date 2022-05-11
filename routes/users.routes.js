const express = require('express');
const { body } = require('express-validator');

//middleware
const {
  userExists,
  protectToken,
  protectEmployee,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');

const {
  createUserValidations,
  checkUserValidations,
  loginValidations,
} = require('../middlewares/validations.middlewares');

//import controller functions
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  disableUser,
  login,
} = require('../controllers/user.controller');

//router declaration
const router = express.Router();

router.post('/', createUserValidations, checkUserValidations, createUser);

router.post('/login', loginValidations, checkUserValidations, login);

// Apply protectToken middleware
router.use(protectToken);

router.get('/', protectEmployee, getAllUsers);

router
  .route('/:id')
  .get(userExists, protectEmployee, getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, disableUser);

module.exports = { usersRouter: router };
