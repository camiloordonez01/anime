const {animeAll, animeById} = require('../controllers/animes.controller');

const resolvers = {
    Query: {
        anime(_, args) {
            const { id } = args;

            const search = animeById(id);
            return search;
        },
        animes(_, args) {
            const { type } = args;

            const search = animeAll(type);
            return search;
        }
    }
}

module.exports = resolvers;