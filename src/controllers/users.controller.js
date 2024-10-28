async function currentUser(req, res) {
	res.json(req.user);
}

module.exports = { currentUser };
