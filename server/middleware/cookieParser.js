const parseUserCookie = (req, res, next) => {
  const { user } = req.cookies;

  if (user) {
    req.user = JSON.parse(user);
  } else {
    req.user = null;
  }

  next();
};
