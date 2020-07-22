const { Sequelize, DataTypes , Deferrable} = require('sequelize');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('test session');
Sequelize.useCLS(namespace);
const sequelize = new Sequelize('postgres://sjkscgbr:DStvgFuR2GcZ6WSwgTJ2lsXfJ1fxzznj@ruby.db.elephantsql.com:5432/sjkscgbr');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER, //could be uuid, for current testing and simplicity sake I'll be using integer 
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    type: { // it is 0 for regular user or 1 for site manager ****could be boolean?
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    managedSiteId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Site',
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    deviceId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

const Device = sequelize.define('Device', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    siteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Site',
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    }
});

const Site = sequelize.define('Site', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// try {
//     sequelize.transaction((t) => {
//         return User.create({id: 1, email: 'colinmaisk@gmail.com', type: 1, managedSiteId: null, deviceId: null});
//     });

// } catch (err) {
//     console.log('it dont work')
// }

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



user type 0 or type 1

user has 1 device number or has many

user 1 has managed sites or null
user 0 has null managed sites

device has 1 site





*/