const mockAuthMiddleware = (user) => {
    return (req, res, next) => {
      req.user = user;
      next();
    };
  };

module.exports = mockAuthMiddleware;