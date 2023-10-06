const db = require('../config/connection');
const { Order, Organization, User, Tag} = require('../models');
const userSeeds = require('./userSeeds.json');
const organizationSeeds = require('./organizationSeeds.json');
const tagSeeds = require('./tagSeeds.json')
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('User', 'users');
  await User.create(userSeeds);
  await cleanDB('Organization', 'organizations');
  await Organization.create(organizationSeeds);
  await cleanDB('Tag', 'tag');
  await Tag.create(tagSeeds);


  console.log('all done!');
  process.exit(0);
});
