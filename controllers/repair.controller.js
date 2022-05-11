const { Repair } = require('../models/repair.model');
const { User } = require('../models/user.model');
// utils
const { catchAsync } = require('../utils/catchAsync');

const getAllPending = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: { status: 'pending' },
    include: [{ model: User }],
  });
  res.status(200).json({
    repairs,
  });
});

const getPendingById = catchAsync(async (req, res, next) => {
  const { repair } = req;

  res.status(200).json({
    repair,
  });
});

const createDate = catchAsync(async (req, res, next) => {
  const { date, userId, computerNumber, comments } = req.body;
  const newDate = await Repair.create({
    date,
    userId,
    computerNumber,
    comments,
  });
  res.status(201).json({ newDate });
});

const updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: 'completed' });
  res.status(200).json({ status: 'success' });
});

const cancelRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: 'cancelled' });

  res.status(201).json({
    status: 'success',
    message: 'Request have been cancelled',
  });
});

module.exports = {
  getAllPending,
  getPendingById,
  createDate,
  updateRepair,
  cancelRepair,
};
