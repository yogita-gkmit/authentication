const findQuery = async function query(collection) {
	// const data = await collection.find().toArray();
	// console.log('Found Accounts Documents ==> ', data);

	const data = await collection
		.aggregate([
			{
				$project: {
					_id: 1,
					roles_accounts: {
						$objectToArray: '$roles',
					},
				},
			},
			{
				$unwind: '$roles_accounts',
			},
			{
				$group: {
					_id: '$roles_accounts.k',
					count: { $sum: 1 },
				},
			},
		])
		.toArray();

	console.log('Found Accounts Documents ==> ', data);
};

module.exports = { findQuery };
