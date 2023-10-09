const db = require('../config/connection.js');
const { Order, Organization, User, Tag} = require('../models/index.js');
const cleanDB = require('./cleanDB.js');
// const tagSeeds = require('./tagSeeds.json');
// const userSeeds = require('./userSeeds.json');
// const organizationSeeds = require('./organizationSeeds.json');
// const {
//     tagAgriculture,
//     tagAnimalWelfare,
//     tagArts,
//     tagCommunityDevelopment,
//     tagCulturalPreservation,
//     tagDisabilityServices,
//     tagDisasterRelief,
//     tagEducation,
//     tagElderlyServices,
//     tagEmergencyServices,
//     tagEnvironment,
//     tagGenderEquality,
//     tagHealthcare,
//     tagHomelessness,
//     tagHumanRights,
//     tagHungerAndPoverty,
//     tagMentalHealth,
//     tagSportsNRec,
//     tagTechnology,
//     tagYouthPrograms
// } = require('../../client/src/utils/importPhotos.js')

db.once('open', async () => {
  await cleanDB('User', 'users');
const users =  await User.create([
    {
        "username": "JohnDoe1",
        "email": "john.doe1@example.com",
        "password": "password1!",
        "isAdmin": true,
        "savedOrganizations": [],
        "orderHistory": [],
        "image": null,
        "organizationCount": 0
    },
    {
        "username": "JaneSmith2",
        "email": "jane.smith2@example.com",
        "password": "password1!",
        "isAdmin": true,
        "savedOrganizations": [],
        "orderHistory": [],
        "image": null,
        "organizationCount": 0
    },
    {
        "username": "MikeJohnson3",
        "email": "mike.johnson3@example.com",
        "password": "password1!",
        "isAdmin": true,
        "savedOrganizations": [],
        "orderHistory": [],
        "image": null,
        "organizationCount": 0
    },
    {
        "username": "SarahWilson4",
        "email": "sarah.wilson4@example.com",
        "password": "password1!",
        "isAdmin": true,
        "savedOrganizations": [],
        "orderHistory": [],
        "image": null,
        "organizationCount": 0
    },
    {
        "username": "DavidBrown5",
        "email": "david.brown5@example.com",
        "password": "password1!",
        "isAdmin": true,
        "savedOrganizations": [],
        "orderHistory": [],
        "image": null,
        "organizationCount": 0
    },
    {
        "username": "EmilyDavis6",
        "email": "emily.davis6@example.com",
        "password": "password1!",
        "isAdmin": true,
        "savedOrganizations": [],
        "orderHistory": [],
        "image": null,
        "organizationCount": 0
    },
    {
        "username": "MarkClark7",
        "email": "mark.clark7@example.com",
        "password": "password1!",
        "isAdmin": true,
        "savedOrganizations": [],
        "orderHistory": [],
        "image": null,
        "organizationCount": 0
    },
    {
        "username": "OliviaWhite8",
        "email": "olivia.white8@example.com",
        "password": "password1!",
        "isAdmin": true,
        "savedOrganizations": [],
        "orderHistory": [],
        "image": null,
        "organizationCount": 0
    },
    {
        "username": "JamesTaylor9",
        "email": "james.taylor9@example.com",
        "password": "password1!",
        "isAdmin": true,
        "savedOrganizations": [],
        "orderHistory": [],
        "image": null,
        "organizationCount": 0
    },
    {
        "username": "MeganAnderson10",
        "email": "megan.anderson10@example.com",
        "password": "password1!",
        "isAdmin": true,
        "savedOrganizations": [],
        "orderHistory": [],
        "image": null,
        "organizationCount": 0
    },
    {
      "username": "User6",
      "email": "user6@example.com",
      "password": "password1!",
      "isAdmin": false,
      "savedOrganizations": [],
      "orderHistory": [],
      "image": null,
      "organizationCount": 0
    }
  ]);



  await cleanDB('Tag', 'tags');
 const tags = await Tag.create([
    {
        name: "Healthcare",
        // image: tagHealthcare
    },
    {
        name: "Disaster Relief",
        // image: tagDisasterRelief
    },
    {
        name: "Arts",
        // image: tagArts
    },
    {
        name: "Education",
        // image: tagEducation
    },
    {
        name: "Environment",
        // image: tagEnvironment
    },
    {
        name: "Hunger & Poverty",
        // image: tagHungerAndPoverty
    },
    {
        name: "Animal Welfare",
        // image: tagAnimalWelfare
    },
    {
        name: "Community Development",
        // image: tagCommunityDevelopment
    },
    {
        name: "Youth Programs",
        // image: tagYouthPrograms
    },
    {
        name: "Elderly Services",
        // image: tagElderlyServices
    },
    {
        name: "Mental Health",
        // image: tagMentalHealth
    },
    {
        name: "Human Rights",
        // image: tagHumanRights
    },
    {
        name: "Technology",
        // image: tagTechnology
    },
    {
        name: "Cultural Preservation",
        // image: tagCulturalPreservation
    },
    {
        name: "Emergency Services",
        // image: tagEmergencyServices
    },
    {
        name: "Gender Equality",
        // image: tagGenderEquality
    },
    {
        name: "Agriculture",
        // image: tagAgriculture
    },
    {
        name: "Homelessness",
        // image: tagHomelessness
    },
    {
        name: "Disability Services",
        // image: tagDisabilityServices
    },
    {
        name: "Sports & Recreation",
        // image: tagSportsNRec
    }
]);



  await cleanDB('Organization', 'organizations');
  await Organization.create([
    {
      "userId": users[0]._id,
      "name": "Fake Organization 1",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "image": "https://placehold.co/800x600",
      "link": "https://www.google.com/",
      "tag": tags[0]._id,
      "fundraisingGoal": 1000
    },
    {
      "userId": users[1]._id,
      "name": "Fake Organization 2",
      "description": "Praesent vitae massa nec velit feugiat vulputate.",
      "image": "https://placehold.co/800x600",
      "link": "https://www.google.com/",
      "fundraisingGoal": 1000,
      "tag": tags[1]._id,

    },
    {
      "userId": users[2]._id,
      "name": "Fake Organization 3",
      "description": "Suspendisse potenti. Proin bibendum turpis vitae tincidunt.",
      "image": "https://placehold.co/800x600",
      "link": "https://www.google.com/",
      "fundraisingGoal": 1000,
      "tag": tags[2]._id,

    },
    {
      "userId": users[3]._id,
      "name": "Fake Organization 4",
      "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
      "image": "https://placehold.co/800x600",
      "link": "https://www.google.com/",
      "fundraisingGoal": 1000,
      "tag": tags[3]._id,

    },
    {
      "userId": users[4]._id,
      "name": "Fake Organization 5",
      "description": "Nulla facilisi. Nullam sed nisl eu quam bibendum varius.",
      "image": "https://placehold.co/800x600",
      "link": "https://www.google.com/",
      "fundraisingGoal": 1000,
      "tag": tags[4]._id,

    }
  ]);


  console.log('all done!');
  process.exit(0);
});
