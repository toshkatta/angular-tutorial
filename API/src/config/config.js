module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'angularHeroes',
        user: process.env.DB_USER || 'tutorialUser',
        password: process.env.DB_PASS || '123123',
        options: {
            dialect: process.env.DIALECT || 'postgres',
            host: process.env.HOST || 'localhost'
        }
    }
};