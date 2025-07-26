const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(req.body)
  console.log(req.header('Authorization'))
  if (!token){ 
    console.log("No token provided");
    return res.status(401).json({ msg: 'No token, access denied' })};

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded.id;
    req.role = decoded.role; // Store role in request for further use

    next();
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' });
  }
};

module.exports = auth;
