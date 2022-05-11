// Models
const { Repair } = require('./repair.model');
const { User } = require('./user.model');

const initModels = () => {
  // one user <–—> many post
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = { initModels };
