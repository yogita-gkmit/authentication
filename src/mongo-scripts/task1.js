async function upateRolesToNewRoles(collection) {
	let all_data = await collection.find({}, { _id: 1, roles: 1 }).toArray();

	all_data = all_data.map(item => {
		return {
			_id: item._id,
			roles: Object.keys(item.roles),
		};
	});

	console.log(all_data[2]);
	await Promise.all(
		all_data.map(async document => {
			return await collection.updateOne(
				{ _id: document._id },
				{ $set: { new_role: document.roles } },
			);
		}),
	);
}

module.exports = { upateRolesToNewRoles };
