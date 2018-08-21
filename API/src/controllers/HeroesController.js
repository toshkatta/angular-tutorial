const { Heroes } = require('../models')

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const seed = [
    {
        name: `   Mr. 
    
    Nice    ` },
    { name: 'Narco' },
    { name: 'Bombasto' },
    { name: 'Celeritas' },
    { name: 'Magneta' },
    { name: 'RubberMan' },
    { name: 'Dynama' },
    { name: 'Dr IQ' },
    { name: 'Magma' },
    { name: 'Tornado' }
]

let clearWhitespace = (input) => {
    input = input.trim();
    return input.replace(/\s+/g, ' ');
}

module.exports = {
    async getHeroes(req, res) {
        try {
            let name = req.query.name ? req.query.name : '';
            const heroes = await Heroes.findAll({
                where: {
                    name: {
                        [Op.iLike]: '%' + name + '%'
                    }
                }
            });
            res.send(heroes);
        } catch (err) {
            res.status(500).send({
                error: 'Error getting heroes from the db: ' + err
            })
        }
    },
    async getHero(req, res) {
        try {
            let id = parseInt(req.query.id);
            const hero = await Heroes.findById(id);
            res.send([hero]);
        } catch (err) {
            res.status(500).send({
                error: 'Error getting hero with id ' + id + ' from the db: ' + err
            })
        }
    },
    async createHero(req, res) {
        try {
            const hero = await Heroes.create(req.body, { fields: ['name'] });
            res.send(hero);
        } catch (err) {
            res.status(500).send({
                error: 'Error creating hero: ' + err
            })
        }
    },
    async updateHero(req, res) {
        try {
            const hero = await Heroes.update(
                { name: clearWhitespace(req.body.name) },
                { where: { id: req.body.id } }
            );

            res.send(hero);
        } catch (err) {
            res.status(500).send({
                error: 'Error updating hero: ' + err
            })
        }
    },
    async deleteHero(req, res) {
        try {
            let id = parseInt(req.query.id)
            const hero = await Heroes.destroy(
                { where: { id: id } }
            );

            res.send();
        } catch (err) {
            res.status(500).send({
                error: 'Error deleting hero: ' + err
            })
        }
    },
    async seed(req, res) {
        try {
            seed.map((hero) => {
                hero.name = clearWhitespace(hero.name);
            });

            const heroes = await Heroes.bulkCreate(seed, { validate: true });
            res.send(heroes);
        } catch (err) {
            res.status(500).send({
                error: 'Error seeding the db: ' + err
            })
        }
    }
}