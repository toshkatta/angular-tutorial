module.exports = (sequelize, DataTypes) => {
    const Hero = sequelize.define('Heroes', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 30],
                    msg: 'Hero names must be between 1 and 30 characters long.'
                },
                notEmpty: {
                    args: true,
                    msg: 'Name cannot be empty.'
                },
                is: {
                    args: ["[A-Za-z \.]+", 'i'],
                    msg: 'Hero names can only contain letters.'
                }
            }
        }
    }, {
            hooks: {},
            timestamps: false
        })

    return Hero;
}