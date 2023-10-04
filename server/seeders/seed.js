const db = require('../config/connection');
const { Order, Organization, User } = require('../models');
const userSeeds = require('./userSeeds.json');
const organizationSeeds = require('./organizationSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('User', 'users');
  await User.create(userSeeds);
  await cleanDB('Organization', 'organizations');
  await Organization.create(organizationSeeds);

  console.log('all done!');
  process.exit(0);
});
