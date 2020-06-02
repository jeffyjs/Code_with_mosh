const jwt = require('jsonwebtoken');
const config = require ('config'); 
 module.exports = function auth(req,res,next){
    const token = req.header('x-auth-token');
   if(!token) return res.status(401).send ('Access denied. No token provide ');

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivatekey'));
        req.user = decoded;
        next()
    }
  catch (ex) {
    res.status(401).send ('Invalid Token');
  }

}

