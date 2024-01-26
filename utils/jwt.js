const jwt = require('jsonwebtoken');

exports.sign = (payload) => jwt.sign(payload, '1234');

exports.verify = (payload) => jwt.verify(payload, '1234');
