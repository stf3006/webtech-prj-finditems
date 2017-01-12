module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 100],
                isAlpha: true
            }
        }
    });
    return Category;
};
