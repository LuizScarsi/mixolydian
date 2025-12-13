// models/User.js
"use strict";
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        name: DataTypes.STRING,
        email: { type: DataTypes.STRING, unique: true },
        password_hash: DataTypes.STRING,
        role: { 
            type: DataTypes.STRING, 
            defaultValue: 'user'
        }
    }, {
        sequelize,
        tableName: "users",
        timestamps: false,
        hooks: {
            beforeSave: async (user) => {
                if (user.changed('password_hash')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password_hash = await bcrypt.hash(user.password_hash, salt);
                }
            }
        }
    });

    User.prototype.validatePassword = function (password) {
        return bcrypt.compare(password, this.password_hash);
    };

    return User;
};
