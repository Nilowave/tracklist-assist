const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

const getUser = (req, res) => {
  if (req.user) res.send(req.user);
  else res.send({ error: 'no-user' });
};

module.exports = {
  logout,
  getUser,
};
