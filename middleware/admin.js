module.exports = function(req, res, next) {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
  };