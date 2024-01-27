const { verify } = require('../utils/jwt');

function authMiddleware(req, res, next) {
  const { dev } = req.headers;
  const verifyToken = verify(dev);
  if(verifyToken == 'developer') {
    next()
    return
  }
  return res.json('Interval sever error');
}

module.exports = authMiddleware;
