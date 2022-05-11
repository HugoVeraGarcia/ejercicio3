const express = require('express');
const rateLimit = require('express-rate-limit');

// Controllers
const { globalErrorHandler } = require('./controllers/errors.controller');

//Routers to endpoints
const { usersRouter } = require('./routes/users.routes');
const { repairsRouter } = require('./routes/repairs.routes');

const { db } = require('./utils/database');

// Models
const { Repair } = require('./models/repair.model');
const { User } = require('./models/user.model');

//Init express app
const app = express();

//Enable incoming JSON data
app.use(express.json());

// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP',
});

app.use(limiter);

//  Endpoints & routers
app.use('/api/v1/users', usersRouter);

app.use('/api/v1/repairs', repairsRouter);

// Global error handler
app.use('*', globalErrorHandler);

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
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
