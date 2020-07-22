const { Sequelize } = require('sequelize');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('take home problem');
Sequelize.useCLS(namespace);
const sequelize = new Sequelize('postgres://sjkscgbr:DStvgFuR2GcZ6WSwgTJ2lsXfJ1fxzznj@ruby.db.elephantsql.com:5432/sjkscgbr');

let getSiteManagerDevices = (userEmail) => {

    // find user by email
    let user = await User.findOne({where: {email: userEmail}}); 
    let namesToReturn = [];
    let individualDevice;

    //check to see if we found a user or user is type 0 which is not allowed access 
    //check to see if site manager siteId is null
    if (user === null) {    
        return "No site manager by this email";
    } else if (user.type === 0){    
        // the more efficient way of doing this is have an include in the original user request to the db.
        individualDevice = await Device.findByPk(user.deviceId);
        
        return [individualDevice.name];
        // original request to return empty array
        // return []; 
    }else if (user.managedSiteId === null) {
        return [];
    };
    
    // get the user site id after checking to make sure we have a user
    const { managedSiteId } = user;

    //get all devices where site id equals the user's site id
    let deviceArr = await Device.findAll({where: {siteId: managedSiteId}});

    //add each device's names to an array
    namesToReturn = deviceArr.map(device => device.name);

    return namesToReturn;
}

/*
    let user = await User.findOne({where: {email: `${userEmail}`}});
    let device = await Device.findAll()
*/