const { sign, verify } = require('jsonwebtoken');
const jwt = require('jsonwebtoken')

const createTokens = (user) => {
  console.log(user)
  const authToken = sign({user}, '98327598263984yhefiuwhrfi', {expiresIn: 600,});
  return authToken;
}

const validateToken = (req, res, next) => {
  const authToken = req.headers["x-access-token"]
  if (!authToken) {
    return res.status(200).json({ authUser: false, err: "Nie zalogowany" })
  } else {
    jwt.verify(authToken, '98327598263984yhefiuwhrfi', (err, decoded) => {
      if (err) {
        res.locals.authUser = false;
        console.log(err)
        return next();
      } else {
        res.locals.authUser = true;
        console.log(authToken)
        return next();
      }
    })
  }
}

module.exports = { createTokens, validateToken };