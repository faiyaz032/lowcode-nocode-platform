const checkAgent = (req, res, next) => {
  const agent = req.get('Request-From');
  if (agent === 'Game Engine') {
    req.isFromGameEngine = true;
    next();
  } else {
    req.isFromGameEngine = false;
    next();
  }
};

export default checkAgent;
