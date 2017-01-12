module.exports = function(sequelize, DataTypes) {
    var LostObject = sequelize.define('lostobject', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 100],
                isAlpha: true
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
                isAfter: "2008-01-01"
            }
        },
        
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 100],
                isAlpha: true
            }
        }
        
    });
    return LostObject;
};
