logout = (req, res) => {
  console.log('logout user');
  req.logout();
  res.redirect('/');
};

getUser = (req, res) => {
  console.log('get user');
  if (req.user) res.send(req.user);
  else res.send({ error: 'no-user' });
};

module.exports = {
  logout,
  getUser,
};
