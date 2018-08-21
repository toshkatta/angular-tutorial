const { sequelize } = require('./models');
const config = require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the db has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({
    logging: console.log
})
    .then(() => {
        app.listen(config.port);
        console.log(`Server started on port ${config.port}`)
    })
    .catch((err) => {
        console.error(err);
    });
;