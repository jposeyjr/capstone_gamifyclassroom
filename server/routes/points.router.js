const Router = require('express').Router;

const router = new Router();

router.get('/', (req, res, next) => {
  console.log(req.app.locals.io); //io object
  const io = req.app.locals.io;
  io.emit('my event', { my: 'data' }); //emit to everyone
  res.sendStatus(200);
});

module.exports = router;
