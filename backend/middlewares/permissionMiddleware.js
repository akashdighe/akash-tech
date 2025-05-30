const permissionMiddleware = (moduleName, action) => (req, res, next) => {
  const { permissions } = req.user; // From auth middleware

  if (!permissions || !Array.isArray(permissions)) {
    return res.status(403).json({ message: "Permissions not found" });
  }

  const modulePerm = permissions.find((perm) => perm.module === moduleName);

  if (!modulePerm || !modulePerm[action]) {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};

export default permissionMiddleware;
