import User from './models'
const { Sequelize } = require('sequelize');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('test session');
Sequelize.useCLS(namespace);
const sequelize = new Sequelize('postgres://sjkscgbr:DStvgFuR2GcZ6WSwgTJ2lsXfJ1fxzznj@ruby.db.elephantsql.com:5432/sjkscgbr');



try {
    sequelize.transaction((t) => {
        return User.create({id: 1, email: 'colinmaisk@gmail.com', type: 1, managedSiteId: null, deviceId: null});
    });

} catch (err) {
    console.log('it dont work')
}




/*

User = {
    id: number
    email: string (email address)
    type: 0 for regular user (who only has one device) or 1 for a site manager (who can see all devices at the site that they manage)
    managedSiteId: number (id of site that the user manages, if type 1; may be null)
    deviceId: number (id of Device that the user uses, may be null)
}
Device = {
    id: number
    name: string
    siteId: number (id of Site where Device is located)
}
Site = {
    id: number
    name: string
}

*/