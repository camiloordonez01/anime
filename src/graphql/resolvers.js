const {animeAll, animeById, csvImport} = require('../controllers/animes.controller');

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
        },
        import(_, args){
            console.log('entro');
            const r = csvImport();
            return 'Ok';
        }
    }
}

module.exports = resolvers;