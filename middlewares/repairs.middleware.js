const { Repair } = require('../models/repair.model');
const { User } = require('../models/user.model');
// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const repairExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: { id, status: 'pending' },
    include: [{ model: User }],
  });

  if (!repair) {
    return next(
      new AppError(`Repair pending not found given that id: ${id}`, 404)
    );
  }

  //add user data to request
  req.repair = repair;

  next();
});

module.exports = { repairExist };
