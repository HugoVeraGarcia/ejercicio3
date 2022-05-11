const { app } = require('./app');

// Models
const { Repair } = require('./models/repair.model');
const { User } = require('./models/user.model');

// Utils
const { db } = require('./utils/database');

// authenticate
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

// Establish models relations
// one user <–—> many post
User.hasMany(Repair);
Repair.belongsTo(User);

//sync
db.sync() //{ force: true }
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

//spin up server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
