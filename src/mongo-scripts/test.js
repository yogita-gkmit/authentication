async function addRolesCollection(db) {
	await db.createCollection('roles', {
		validator: {
			$jsonSchema: {
				bsonType: 'object',
				required: ['name'],
				properties: {
					name: {
						bsonType: 'string',
						description: 'must be a string and is required',
					},
					description: {
						bsonType: 'string',
						description: 'must be a string',
					},
				},
			},
		},
		collation: { locale: 'en', strength: 2 },
	});
}

module.exports = { addRolesCollection };
