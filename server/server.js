const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
// Route includes
const userRouter = require('./routes/user.router');
const classRouter = require('./routes/class.router');
const studentRouter = require('./routes/student.router');
const pointsRouter = require('./routes/points.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/class', classRouter);
app.use('/api/student', studentRouter);
app.use('/api/points', pointsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

//setting up WS and allow traffic to come through
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let socket_id = [];
app.locals.io = io;
io.on('connection', (socket) => {
  socket_id.push(socket_id);
  if (socket_id[0] === socket.id) {
    io.removeAllListeners('connection');
  }
  console.log('New client connected');
  socket.emit('connection', null);
  io.on('disconnect', () => console.log('Client disconnected'));
});

/** Listen * */
http.listen(PORT, () => {
  console.log('Websocket listing on port: ' + PORT);
});
