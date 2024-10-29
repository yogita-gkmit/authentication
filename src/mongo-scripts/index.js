const { MongoClient } = require('mongodb');
// const dotenv = require('dotenv');
// dotenv.config();

// const url = process.env.MONGO_URL;

const url = process.argv[2];

// const test = require('./test.js');
const { addRoleDataToRoles } = require('./test.js');
const client = new MongoClient(url);

const dbName = 'pillpal';

async function main() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('accounts');

  await test.findQuery(collection);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
