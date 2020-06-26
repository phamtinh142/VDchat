

exports.login = async (req, res) => {
  console.log(`------- 'test' ------- login`);
  console.log('test');
  console.log(`------- 'test' ------- login`);
  return res.json({ user: 'login' });
}

exports.signup = async (req, res) => {
  console.log(`------- 'test' ------- signup`);
  console.log('test');
  console.log(`------- 'test' ------- signup`);
  return res.json({ user: 'signup' });
}