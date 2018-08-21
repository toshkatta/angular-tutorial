const Sequalize = require('sequelize');
const bcrypt = require('bcryptjs');

let connection = new Sequalize.define('User',
    {
        username: Sequalize.TEXT,
        password: Sequalize.TEXT
    },
    {
        hooks: {
            afterValidate: function (user) {
                user.password = bcrypt.hashSync(user.password, 8);
            }
        }
    }
);

connection.sync({
    force: true,
    logging: console.log
})
    .then(() => { })
    .catch((err) => {
        console.error(err);
    });