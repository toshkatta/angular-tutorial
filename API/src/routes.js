const heroesController = require('./controllers/HeroesController');

module.exports = (app) => {
    app.get('/heroes', heroesController.getHeroes);
    app.post('/heroes', heroesController.createHero);

    app.get('/hero', heroesController.getHero);
    app.put('/hero', heroesController.updateHero);
    app.delete('/hero', heroesController.deleteHero);

    app.get('/seed', heroesController.seed);
}