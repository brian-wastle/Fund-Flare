const db = require('../config/connection.js');
const { Order, Organization, User, Tag} = require('../models/index.js');
const cleanDB = require('./cleanDB.js');


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
        "name": "Healthcare",
        "image": "tagHealthcare"
    },
    {
        "name": "Disaster Relief",
        "image": "tagDisasterRelief"
    },
    {
        "name": "Arts",
        "image": "tagArts"
    },
    {
        "name": "Education",
        "image": "tagEducation"
    },
    {
        "name": "Environment",
        "image": "tagEnvironment"
    },
    {
        "name": "Hunger & Poverty",
        "image": "tagHungerAndPoverty"
    },
    {
        "name": "Animal Welfare",
        "image": "tagAnimalWelfare"
    },
    {
        "name": "Community Development",
        "image": "tagCommunityDevelopment"
    },
    {
        "name": "Youth Programs",
        "image": "tagYouthPrograms"
    },
    {
        "name": "Elderly Services",
        "image": "tagElderlyServices"
    },
    {
        "name": "Mental Health",
        "image": "tagMentalHealth"
    },
    {
        "name": "Human Rights",
        "image": "tagHumanRights"
    },
    {
        "name": "Technology",
        "image": "tagTechnology"
    },
    {
        "name": "Cultural Preservation",
        "image": "tagCulturalPreservation"
    },
    {
        "name": "Emergency Services",
        "image": "tagEmergencyServices"
    },
    {
        "name": "Gender Equality",
        "image": "tagGenderEquality"
    },
    {
        "name": "Agriculture",
        "image": "tagAgriculture"
    },
    {
        "name": "Homelessness",
        "image": "tagHomelessness"
    },
    {
        "name": "Disability Services",
        "image": "tagDisabilityServices"
    },
    {
        "name": "Sports & Recreation",
        "image": "tagSportsNRec"
    }
]);



  await cleanDB('Organization', 'organizations');
  await Organization.create([
    {
      "userId": users[0]._id,
      "name": "Hope Haven Disaster Relief",
      "description": "Providing hope and help in times of crisis.",
      "image": "https://cdn.filestackcontent.com/xd7HW8iwQHm1tO4np7qt",
      "link": "https://www.hopehavenrelief.org",
      "tag": tags[1]._id,
      "fundraisingGoal": 5000,
      "fundraisingAmount": 1000
    },
    {
      "userId": users[1]._id,
      "name": "Rapid Response Relief Network",
      "description": "Swift emergency response and relief services.",
      "image": "https://cdn.filestackcontent.com/dJIruPVES5K2Gb3dNEkQ",
      "link": "https://www.rapidreliefnetwork.org",
      "tag": tags[1]._id,
      "fundraisingGoal": 3000,
      "fundraisingAmount": 500
    },
    {
      "userId": users[2]._id,
      "name": "Resilience United",
      "description": "Building resilience in disaster-affected communities.",
      "image": "https://cdn.filestackcontent.com/RQcf8bt7SqWozmk94oFm",
      "link": "https://www.resilienceunited.org",
      "tag": tags[1]._id,
      "fundraisingGoal": 7000,
      "fundraisingAmount": 2500
    },
    {
      "userId": users[3]._id,
      "name": "Healthy Futures Foundation",
      "description": "Dedicated to promoting a healthier tomorrow for all.",
      "image": "https://cdn.filestackcontent.com/G4B8CoG7RTGOezEPcglG",
      "link": "https://www.healthyfutures.org",
      "tag": tags[0]._id,
      "fundraisingGoal": 8000,
      "fundraisingAmount": 1000
    },
    {
      "userId": users[4]._id,
      "name": "Healing Hands Medical Relief",
      "description": "Bringing medical care where it's needed most, in times of need.",
      "image": "https://cdn.filestackcontent.com/sI4mrSRpQ9qEXqITdwoL",
      "link": "https://www.healinghandsrelief.org",
      "tag": tags[0]._id,
      "fundraisingGoal": 6000,
      "fundraisingAmount": 100
    },
    {
      "userId": users[5]._id,
      "name": "Artistic Expressions Society",
      "description": "Supporting local artists and promoting creative expression.",
      "image": "https://cdn.filestackcontent.com/OS2TP6MQayxfcxHOPvrM",
      "link": "https://www.artisticexpressions.org",
      "tag": tags[2]._id,
      "fundraisingGoal": 5000,
      "fundraisingAmount": 4000
    },
    {
      "userId": users[6]._id,
      "name": "Music and Dance Academy",
      "description": "Empowering young talents in the world of music and dance.",
      "image": "https://cdn.filestackcontent.com/oRwgqIkTSOuqYNcsJ9C2",
      "link": "http://www.musicanddanceacademy.org",
      "tag": tags[2]._id,
      "fundraisingGoal": 7000,
      "fundraisingAmount": 6000
    },
    {
      "userId": users[7]._id,
      "name": "Theater Arts Foundation",
      "description": "Fostering the love for theater and performing arts in our community.",
      "image": "https://cdn.filestackcontent.com/uN83xydFSaSZFdLAM4pm",
      "link": "https://www.theaterartsfoundation.org",
      "tag": tags[2]._id,
      "fundraisingGoal": 6000,
      "fundraisingAmount": 3500
    },
    {
      "userId": users[8]._id,
      "name": "Visual Arts Collective",
      "description": "Celebrating visual arts and supporting emerging artists.",
      "image": "https://cdn.filestackcontent.com/cPr4djWQpKI4twcI3grm",
      "link": "https://www.visualartscollective.org",
      "tag": tags[2]._id,
      "fundraisingGoal": 5500,
      "fundraisingAmount": 700

    },
    {
      "userId": users[9]._id,
      "name": "Green Earth Alliance",
      "description": "Dedicated to preserving and protecting our planet's natural beauty.",
      "image": "https://cdn.filestackcontent.com/B7QRBsx3Qr29or2pIwMJ",
      "link": "https://www.greenearthalliance.org",
      "tag": tags[4]._id,
      "fundraisingGoal": 8000,
      "fundraisingAmount": 1000
    }
  ]);


  console.log('all done!');
  process.exit(0);
});
