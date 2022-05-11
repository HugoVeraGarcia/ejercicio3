const express = require('express');
const { body } = require('express-validator');

//middleware
const { repairExist } = require('../middlewares/repairs.middleware');
const {
  protectToken,
  protectEmployee,
} = require('../middlewares/users.middlewares');

const {
  createRepairValidations,
  checkRepairValidations,
} = require('../middlewares/validations.middlewares');

const {
  getAllPending,
  getPendingById,
  createDate,
  updateRepair,
  cancelRepair,
} = require('../controllers/repair.controller');

//router declaration
const router = express.Router();

// Apply protectToken middleware
router.use(protectToken);

router.post('/', createRepairValidations, checkRepairValidations, createDate);

//this protects all code bellow
router.use(protectEmployee);

router.get('/', getAllPending);

router
  .route('/:id')
  .get(repairExist, getPendingById)
  .patch(repairExist, updateRepair)
  .delete(repairExist, cancelRepair);

module.exports = { repairsRouter: router };
