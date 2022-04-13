
const JWT_SECRET = 'asasada'


const requireLogin = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "You must be authorized" });
    }
    try{
      const { userId } = jwt.verify(authorization, JWT_SECRET);
    req.user = userId;
    next();
    }catch(err) { 
      return res.status(401).json({error:'You must be logged inn..'})
    }
  };
  
  module.exports = requireLogin;
  
  
  
  