const mockAuthMiddleware = (user) => {
    return (req, res, next) => {
      console.log(user);
      req.user = user;
      next();
    };
  };

module.exports = mockAuthMiddleware;