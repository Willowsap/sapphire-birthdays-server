const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    jwt.verify(token, "x");
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated"});
  }
}
